import express from 'express';

import userController from './controllers/userController';
import translationController from './controllers/translationController';
import newsController from './controllers/newsController';
import commonController from './controllers/commonController';

const router = express.Router();

function initUserRoutes() {
  router.get('/api/users/:identifier', userController.ajaxCheck);
  router.post('/api/users/save', userController.saveUser);
}

function initTranslationRoutes() {
  router.get('/api/translations/list', translationController.getTranslations);
  router.get('/api/translations/package', translationController.getTranslationsFromList);
  router.get('/api/translations/page', translationController.getTranslationsByPrefix);
  router.get('/api/translations/get', translationController.getTranslation);
  router.post('/api/translations/save', translationController.saveTranslation);
}

function initNewsRoutes() {
  router.get('/api/news/list', newsController.getNewsPage);
  router.get('/api/news/get', newsController.getNews);
  router.post('api/news/save', newsController.saveNews);
}

function initCommonRoutes() {
  router.post('/api/common/mail', commonController.mailSender);
}

initUserRoutes();
initTranslationRoutes();
initNewsRoutes();
initCommonRoutes();

export default router;
