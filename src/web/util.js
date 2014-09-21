/*!
 * Utilities. 
 * 
 */
export default {

  cache: {
    title: ''
  },

  // Uses two functions to find out whether the browser got support to a particular feature.
  // First, by checking against the HTML5 standard API, then by checking  by the browser prefix.
  getVendorPrefix(html5standardTest = () => false, vendorPrefixTest = () => false) {
    let result = html5standardTest();
    if (result) {
      return result;
    }

    for (let prefix of ['webkit', 'moz', 'ms', 'o']) {
      let result = vendorPrefixTest(prefix);    
      if (result) {
        return result;
      }
    }

    return '';
  },

  // Gets the visibility changed event name (for the Page Visibility API)
  getVisibilityChangePrefix() {
    return this.getVendorPrefix(
      () => 'visibilitychange' in document ? 'visibilitychange' : '',
      (prefix) => prefix + 'visibilitychange' in document ? prefix + 'visibilitychange' : ''
    );
  },

  // Gets the "requestFullscreen" function name.
  getRequestFullscreenPrefix() {
    let body = document.body;
    let fullscreenPrefix = this.getVendorPrefix(
      () => 'requestFullscreen' in body ? 'requestFullscreen' : '',
      (prefix) => prefix + 'RequestFullscreen' in body ? prefix + 'RequestFullscreen' : ''
    );

    return fullscreenPrefix;
  }
};