import jwtDecode from 'jwt-decode';
import * as store from 'store';
import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://9da126b6.ngrok.io/api',
});

export default class Helpers {
  static isTokenValid(accessToken) {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      console.warn('session expired');
      return false;
    }

    return true;
  }

  static setSession(accessToken) {
    if (accessToken) {
      store.set('access_token', accessToken);
      requester.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      store.remove('access_token');
      delete requester.defaults.headers.common.Authorization;
    }
  }

  static getAccessToken() {
    return store.get('access_token');
  }

  static get axios() {
    return requester;
  }
}
