

/*!
 * Tab controller.
 */
export default ['DeviceService','$scope', '$location', (deviceService, $scope, $location) => {

  $scope.sync = (e) => {
    // Hack to only allow sync from the devices tab...
    if ($location.path() !== '/tab/devices') {
      return;
    }

    deviceService.findOnOffDevices();
    return false;
  };

}];