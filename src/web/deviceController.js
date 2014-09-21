import util from './util';

/*!
 * Controller for the devices tab.
 */
export default [
  '$scope', 
  '$ionicLoading',
  '$ionicPopup',
  'DeviceService',
($scope, $ionicLoading, $ionicPopup, deviceService) => {  

 /*
  * Methods.
  */
  $scope.turnOffAllDevices = () => {
    let promises = $scope.devices
      .filter(device => device.state !== '0' && device.state !== false)
      .map(device => {
        return deviceService
              .doCall('device/turnOff', { id: device.id })
              .then(() => device.state = false);
      });

    Promise.all(promises).then(() => $scope.$apply());
  };
  
  $scope.toggleDevice = (device) => {
    let action = !device.state ? 'turnOff' : 'turnOn';
    deviceService.doCall('device/' + action, { id: device.id });
  };

 /*
  * Events.
  */
  $scope.$on('devices/list', (e, devices = []) => {
    $ionicLoading.hide();
    $scope.$apply(() => {
      $scope.devices = devices;
      $scope.title = $scope.devices.length ? $scope.devices[0].clientName : '';

      util.cache.devices = devices;
      util.cache.title = $scope.title;
    });
  });

  $scope.$on('devices/list/error', (e, err) => {
    $ionicLoading.hide();
    $ionicPopup.alert(err);
  });

  $scope.$on('devices/loading', () => {
    $ionicLoading.show();
  });

 /*
  * Init.
  */
  let init = () => {
    $scope.devices = util.cache.devices;
    $scope.title = util.cache.title;
    if (!$scope.devices) {
      deviceService.findOnOffDevices();
    }
  };

  init();
}];