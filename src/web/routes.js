/*!
 * App route config.
 */
let config = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'TabsController'
    })
    .state('tabs.devices', {
      url: '/devices',
      views: {
        'devices-tab': {
          templateUrl: 'templates/devices.html',
          controller: 'DeviceController'
        }
      }
    })
    .state('tabs.config', {
      url: '/config',
      views: {
        'config-tab': {
          templateUrl: 'templates/config.html',
          controller: 'ConfigController'
        }
      }
    });

   $urlRouterProvider.otherwise('/tab/devices');
};

export default ['$stateProvider', '$urlRouterProvider', config];