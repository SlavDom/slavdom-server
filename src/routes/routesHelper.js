import * as _ from 'lodash';
import config from '../config';

let app = null;
let passport = null;


function normalizeAccessMode(accessMode) {
  if (!accessMode) {
    return {
      auth: true,
    };
  }

  if (_.isUndefined(accessMode.auth)) {
    accessMode.auth = true;
  }

  return accessMode;
}

function getAccessCheck(accessMode) {
  if (!accessMode.auth) return [];

  return [isLoggedIn];
}

function isLoggedIn(req, res, next) {
  if (!config.auth.useAuth) return next();

  if (req.isAuthenticated()) return next();

  res.send(401, 'Unauthorized');
}


function getRouteArguments(path, handler, accessMode) {
  let result = [];

  accessMode = normalizeAccessMode(accessMode);

  result.push(path);
  const accessHandlers = getAccessCheck(accessMode);
  result = result.concat(accessHandlers);
  result.push(handler);

  return result;
}

function httpGet(path, handler, accessMode) {
  const args = getRouteArguments(path, handler, accessMode);
  app.get(...args);
}

function httpPost(path, handler, accessMode) {
  const args = getRouteArguments(path, handler, accessMode);
  app.post(...args);
}

function httpPut(path, handler, accessMode) {
  const args = getRouteArguments(path, handler, accessMode);
  app.put(...args);
}

function httpDelete(path, handler, accessMode) {
  const args = getRouteArguments(path, handler, accessMode);
  app.delete(...args);
}

export default function init(expressApp, passportAuth) {
  app = expressApp;
  passport = passportAuth;
  return {
    app,
    isLoggedIn,
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
  };
}
