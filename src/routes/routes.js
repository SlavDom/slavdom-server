import init from '../auth/authController';
import errorController from '../controllers/errorController';
import helperInit from './routesHelper';
import userController from '../controllers/userController';
import translationController from '../controllers/translationController';

export default {
    init: initRoutes
};

let helper = helperInit(null, null);

function initRoutes(app, passport) {
    helper = helperInit(app, passport);

    initAuthRoutes(passport);

    helper.get('/', errorController.send);

    initUserRoutes();
    
    initTranslationRoutes();

    //all other routes are rendered as home (for client side routing)
    helper.get('*', errorController.send);
}

function initUserRoutes() {
    helper.get('/api/users/list', userController.getUsers);
    helper.get('/api/users/get', userController.getUser);
    helper.post('/api/users/save', userController.saveUser);
    helper.delete('/api/users/delete', userController.deleteUser);
}

function initTranslationRoutes() {
    helper.get('/api/translations/list', translationController.getTranslations);
    helper.get('/api/translations/get', translationController.getTranslation);
    helper.post('/api/translations/save', translationController.saveTranslation);
}

function initAuthRoutes(passport) {
    let authController = init(passport);

    helper.get('/activate/:token', authController.activate, {auth: false});
    helper.post('/login', authController.logInPost, {auth: false});
    helper.post('/signup', authController.signUpPost, {auth: false});
    helper.get('/logout', authController.logOut, {auth: false});
    helper.post('/passwordForgot', authController.forgotPasswordPost, {auth: false});
    helper.post('/passwordReset/:token', authController.resetPasswordPost, {auth: false});
}