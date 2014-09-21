import deviceService from './deviceService';
import configController from './configController';
import deviceController from './deviceController';
import tabsController from './tabsController';
import util from './util';
import routes from './routes';

// Shortcut.
let $ = angular.element;

// Create and initialize angular.
// Could of course just created the module, and then let the controllers
// require the module.
let appmodule = angular.module('tellstick', ['ionic'])
  .config(routes)
  .service('DeviceService', deviceService)
  .controller('ConfigController', configController)
  .controller('DeviceController', deviceController)
  .controller('TabsController', tabsController)
  .run(['$rootScope', ($rootScope) => {
    // Angular injections is complete.
    $(document).ready(() => {
      // Get the DeviceService manually and
      // use it to sync devices when page visibility has changes to visible.
      let injector = $(document.body).injector();
      let service = injector.get('DeviceService');

      document.addEventListener(util.getVisibilityChangePrefix(), (e) => {        
        if (document.visibilityState === 'visible') {
          service.findOnOffDevices();
        }
      });

      // Request fullscreen.
      let prefix = util.getRequestFullscreenPrefix();
      document.body[prefix] && document.body[prefix]();
    });
  }]);

export default appmodule;