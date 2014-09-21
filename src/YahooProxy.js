import Qs from 'qs';

/*!
 * Telldus API cannot handle CORS requests and does not 
 * handle JSONP. 
 *
 * This class uses Yahoo YQL as a proxy to be able to 
 * communicate with the Telldus API through CORS.
 */
export default class YahooProxy {

  static toYQL(url, params) {
    let yqlUrl = '//query.yahooapis.com/v1/public/yql?q=',
        query = 'select * from json where url="{url}"'.replace('{url}', url);
   
    return yqlUrl + encodeURIComponent(query) + '&format=json';
  }

  static async createCORSRequest(url, params) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
   
      xhr.open('GET', this.toYQL(url + '?' + Qs.stringify(params)), true);
      xhr.onload = () => {
        let res = JSON.parse(xhr.responseText);
        if (res && res.query && res.query.results) {
          resolve(res.query.results);
        } else {
          reject('Failed to communicate with Telldus. Press sync to try again.');
        }
      };
   
      xhr.onerror = reject;  
      xhr.send();
    }); 
  }
}