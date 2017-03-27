import express from 'express';

import userController from './controllers/userController';
import translationController from './controllers/translationController';
import newsController from './controllers/newsController';

const router = express.Router();

function initUserRoutes() {
  router.get('/api/users/:identifier', userController.ajaxCheck);
  router.post('/api/users/save', userController.saveUser);
}

function initTranslationRoutes() {
  router.get('/api/translations/list', translationController.getTranslations);
  router.get('/api/translations/package', translationController.getTranslationsFromList);
  router.get('/api/translations/get', translationController.getTranslation);
  router.post('/api/translations/save', translationController.saveTranslation);
}

function initNewsRoutes() {
  router.get('/api/news/list', newsController.getNewsList);
  router.get('/api/news/get', newsController.getNews);
  router.post('api/news/save', newsController.saveNews);
}

initUserRoutes();
initTranslationRoutes();
initNewsRoutes();

export default router;
