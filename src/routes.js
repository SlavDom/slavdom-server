import express from 'express';

import userController from './controllers/userController';
import translationController from './controllers/translationController';
import newsController from './controllers/newsController';

const router = express.Router();

function initUserRoutes() {
  router.get('/api/users/list', userController.getUsers);
  router.get('/api/users/get', userController.getUser);
  router.post('/api/users/save', userController.saveUser);
  router.delete('/api/users/delete', userController.deleteUser);
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
