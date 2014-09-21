export default {
  endpoint: 'https://api.telldus.com/json/',
  
  // ES5 getters and setters that stores configuration in localStorage.
  get publicKey() { return localStorage['telldus.publicKey'] },
  set publicKey(value) { localStorage['telldus.publicKey'] = value; },

  get privateKey() { return localStorage['telldus.privateKey'] },
  set privateKey(value) { localStorage['telldus.privateKey'] = value; },

  get accessToken() { return localStorage['telldus.accessToken'] },
  set accessToken(value) { localStorage['telldus.accessToken'] = value; },

  get accessTokenSecret() { return localStorage['telldus.accessTokenSecret'] },
  set accessTokenSecret(value) { localStorage['telldus.accessTokenSecret'] = value; }
};
