import { TelldusAPI } from '../TelldusAPI';
var api = new TelldusAPI;

/*!
 * Angular Service that speaks to the Telldus API module.
 *
 * Sends events that controllers can consume.
 * Could used a simple pub/sub event class instead. But for now 
 * just use the more inefficient angular $broadcast (that sends the events to all $scopes and not 
 * just to the subscribers).
 *
 */
export default ['$rootScope', $rootScope => {

  // Finds OnOff-devices (supportedMethods=1).
  this.findOnOffDevices = async () => {
    let devices = [];
    $rootScope.$broadcast('devices/loading');

    try {
      let data = await this.doCall('devices/list', { supportedMethods: 1 });
      if (data.error) {
        throw new Error(data.error);
      }

      devices = data.json.device;
      $rootScope.$broadcast('devices/list', devices);

    } catch(err) {
      $rootScope.$broadcast('devices/list/error', {
          title: 'Could not get the devices',
          template: err
      });
    }

    return devices;
  };

  this.doCall = async (command, options) => {
    return await api.doCall(command, options);    
  };

  return this;
}];