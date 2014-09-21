import OAuth from 'oauth';
import config from './config';
import YahooProxy from './YahooProxy';

export class TelldusAPI {

  // Use OAuth module to generate OAuth parameters
  generateOAuth(url, params) {    
    let oauth = new OAuth.OAuth(null, null, config.publicKey, config.privateKey, '1.0', null, 'HMAC-SHA1'),
        oauthParameters = oauth._prepareParameters(config.accessToken, config.accessTokenSecret, 'GET', url, params),
        messageParameters = {};

    oauthParameters.forEach(params => messageParameters[params[0]] = params[1]);
    return messageParameters;
  }

  async doCall(path, params) {
    let url = config.endpoint + path;
    
    return await YahooProxy.createCORSRequest(url, this.generateOAuth(url, params));
  }
}