import axios from "axios";
import { isEqual } from "lodash";
const CancelToken = axios.CancelToken;
let source = CancelToken.source();
let url = 'ExecutiveConsole/rest/';

const redirectToLogin = () => {
  let arr = typeof window !== 'undefined' && window.location.href.split('/');
  if (arr.length > 0) {
    arr[arr.length - 1] = 'login';
    window.location.href = arr.join('/');
  }
}

function getQueryString() {
  let cache = {}

  return (n) => {
    if (n in cache) {
      return cache[n];
    }
    else {
      var result = [], hash;
      var locationQueryString = decodeURIComponent(window.location.search);
      locationQueryString = locationQueryString.replace(/&amp;/g, '&');
      var hashes = locationQueryString.slice(locationQueryString.indexOf('?') + 1).split('&');
      var len = hashes.length;

      for (var i = 0; i < len; i++) {
        hash = hashes[i].split('=');
        result.push(hash[0]);
        result[hash[0]] = hash[1];
      }

      result['session'] = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_JWT_TOKEN : result['session']
      cache[n] = result;
      return result;
    }
  }
}

let queryString = getQueryString();
export const resultQueryString = queryString();

function checkRequest() {
  source && source.cancel('Operation canceled due to new request.');

  // save the new request for cancellation
  source = axios.CancelToken.source();

  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //config.headers["Ocp-Apim-Subscription-Key"] =  process.env.REACT_APP_OcpApimSubscriptionKey;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}

export function getBlobImage(request) {
  let getParams = '';

  request.params && Object.keys(request.params).forEach(key => {
    getParams = getParams + key + '=' + request.params[key] + '&'
  });
  getParams = getParams.substring(0, getParams.length - 1)
  getParams = (getParams !== '') ? '&' + getParams : ''

  checkRequest();

  //url = url + 'api.php';  
  return axios({
    method: 'get',
    url: url + request.method + getParams,
    responseType: 'blob',
    headers: {
      "origin": "*", 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Authorization': localStorage.access_token ? localStorage.access_token :  'OTNkODQ0NTYtMGUxYy00MDEyLTlmYjEtYjI3NmQxYTgwZTg5'
    }
  });
}

export function uploadImage(request, formData) {
  return axios.post(
    url + request.method,
    formData,
    {
      headers: {
        "Authorization": localStorage.access_token ? localStorage.access_token :  'OTNkODQ0NTYtMGUxYy00MDEyLTlmYjEtYjI3NmQxYTgwZTg5',
        "Content-type": "multipart/form-data",
      },
    }
  )
}

export function apiGet(request, actionClick = false, withTime = true) {
  let getParams = '';
  let timeString = withTime ? `${'?time=' + new Date().getTime()}` : '';

  request.params && Object.keys(request.params).forEach(key => {
    getParams = getParams + key + '=' + request.params[key] + '&'
  });
  getParams = getParams.substring(0, getParams.length - 1)
  getParams = (getParams !== '') ? '&' + getParams : ''

  checkRequest();

  //url = url + 'api.php';  

  return axios.get(

    url + request.method + timeString + getParams,
    //(actionClick)?{ cancelToken: source.token }:{},
    {
      headers: {
        "origin": "*", 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'Authorization': localStorage.access_token ? localStorage.access_token :  'OTNkODQ0NTYtMGUxYy00MDEyLTlmYjEtYjI3NmQxYTgwZTg5'
      },
    })
    .then(response => {
      return response
    }).catch(error => {
      if (isEqual(error.request.status, 401)) {
        localStorage.clear();
        redirectToLogin();
      }
    });
}

export function apiPost(request, actionClick = false) {
  var dataObj = {};

  Object.keys(request.params).forEach(key => {
    dataObj[key] = request.params[key]
  });
  checkRequest();

  return axios({
    method: 'post',
    url: url + request.method,
    headers: { 'content-type': 'application/json', 'Authorization': localStorage.access_token ? localStorage.access_token :  'OTNkODQ0NTYtMGUxYy00MDEyLTlmYjEtYjI3NmQxYTgwZTg5' },
    data: dataObj,
  }).then(function (response) {
    return response;
  }).catch(error => {
    if (isEqual(error.request.status, 401)) {
      localStorage.clear();
      redirectToLogin();
    }
    return error;
  });
}

export function apiPut(request, actionClick = false) {
  var dataObj = {};

  Object.keys(request.params).forEach(key => {
    dataObj[key] = request.params[key]
  });
  checkRequest();

  return axios({
    method: 'put',
    url: url + request.method,
    headers: { 'content-type': 'application/json', 'Authorization': localStorage.access_token ? localStorage.access_token :  'OTNkODQ0NTYtMGUxYy00MDEyLTlmYjEtYjI3NmQxYTgwZTg5' },
    data: dataObj,
  }).then(function (response) {
    return response;
  }).catch(error => {
    if (isEqual(error.request.status, 401)) {
      localStorage.clear();
      redirectToLogin();
    }
    return error;
  })
}

export function apiDelete(request, actionClick = false) {
  var dataObj = {};

  Object.keys(request.params).forEach(key => {
    dataObj[key] = request.params[key]
  });
  checkRequest();

  return axios({
    method: 'delete',
    url: url + request.method,
    headers: { 'content-type': 'application/json', 'Authorization': localStorage.access_token ? localStorage.access_token :  'OTNkODQ0NTYtMGUxYy00MDEyLTlmYjEtYjI3NmQxYTgwZTg5' },
    data: dataObj,
  }).then(function (response) {
    return response;
  }).catch(error => {
    if (isEqual(error.request.status, 401)) {
      localStorage.clear();
      redirectToLogin();
    }
    return error;
  });
}

export function setLocalStorage(ncrCustomerId, key, value) {
  if (ncrCustomerId) {
    let storage = localStorage.getItem(ncrCustomerId);
    storage = JSON.parse(storage);
    storage[key] = value
    localStorage.setItem(ncrCustomerId, JSON.stringify(storage));
  }
}
export function getLocalStorage(ncrCustomerId, key) {
  if (ncrCustomerId) {
    let storage = localStorage.getItem(ncrCustomerId);
    storage = JSON.parse(storage);
    if (typeof storage === 'object' && storage !== null) {
      return storage[key]
    } else {
      return false;
    }
  }
}
export function removeLocalStorage(ncrCustomerId, key) {
  if (ncrCustomerId) {
    let storage = localStorage.getItem(ncrCustomerId);
    storage = JSON.parse(storage);
    delete storage[key];
    localStorage.setItem(ncrCustomerId, JSON.stringify(storage));
  }
}