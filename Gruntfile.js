var crypto = require('crypto'), 
    fs = require('fs');

function hash(file) {
  var contents = fs.readFileSync(file);

  return crypto
        .createHash('md5')
        .update(contents, 'utf8')
        .digest('hex')
        .substr(0, 8);
}

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    traceur: {
      options: {
        // traceur options here
        experimental: true,
        blockBinding: true,
        modules: 'commonjs',
        includeRuntime: false
      },

      custom: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['web/*.js', '*.js'],
          dest: 'src/es5'
        }]
      }
    },
    
    uglify: {
      options: {
        preserveComments: 'some'
      },
      minify: {        
        files: {}
      }
    },

    notify: {
      build: {
        options: {
          message: 'Build complete!' //required
        }
      }
    },

    replace: {
      build: {
        src: ['index-tmpl.html'],
        dest: 'index.html',
        overwrite: false,

        replacements: [{
            from: '@@hash',
            to: function() {            
              return hash('static/app.js');
            }
          },{
            from: '@@manifest',
            to: function() {
              return 'static/appcache.manifest';
            }
          }]
      },

      manifest: {
        src: ['appcache.manifest'],
        dest: 'static/appcache.manifest',
        overwrite: false,

        replacements: [{
          from: '@@hash',
          to: function() {            
            return hash('static/app.js');
          }
        },
        {
          from: '@@timestamp',
          to: function() {
            return new Date;
          }
        }]
      },

      dev: {
        src: ['index-tmpl.html'],
        dest: 'index.html',
        overwrite: false,

        replacements: [{
          from: '.@@hash',
          to: ''
        },{
          from: '@@manifest',
          to: function() {
            return '';
          }
        }]
      }
    },

    clean: ['./static/*.js', './static/*.manifest'],

    browserify: {
      options: {
        debug: false,
        alias: ['./src/es5/web/app.js:App'],
      },
      dev: {        
        src: ['src/es5/*.js'],
        dest: 'static/app.js'
      }
    },

    watch: {
      files: ['src/*.js', './*.html'],
      tasks: ['traceur', 'browserify', 'replace:dev', 'notify']
    }
  });

  grunt.task.registerTask('dynamic-uglify', '', function() {
    var md5 = hash('static/app.js'),
        uglify = grunt.config.get('uglify');

        
    uglify.minify.files['static/app.' + md5 +'.js'] = [
      'src/vendor/traceur-runtime.js',
      'src/vendor/ionic.bundle.min.js',
      'static/app.js'
    ];

    grunt.config.set('uglify', uglify);
  });


  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-notify');
  
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('build', [
    'clean',
    'traceur',
    'browserify',
    'dynamic-uglify',
    'uglify:minify',
    'replace:manifest',
    'replace:build',
    'notify:build'
  ]);

  grunt.registerTask('default', [
    'clean',
    'traceur',
    'browserify',
    'dynamic-uglify',
    'replace:manifest',
    'replace:dev',    
    'notify:build'
  ]);
};