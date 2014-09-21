import config from '../config';

/*!
 * Controller for the configuration tab.
 */
export default ['$scope', ($scope) => {

	// Dynamicly create $scope functions and properties.
	['publicKey', 'privateKey', 'accessToken', 'accessTokenSecret'].forEach(key => {
		// Read current from config (localstorage)
		$scope[key] = config[key] || 'https://api.telldus.com/keys/generatePrivate';

		// Create change method
		$scope['change' + key] = (value) =>  { config[key] = value; };
	});
	
}];