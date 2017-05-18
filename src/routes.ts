import { Router } from "express";

import TranslationController from "./controllers/translationController";
import CommonController from "./controllers/commonController";
import NewsController from "./controllers/newsController";
import UserController from "./controllers/userController";
import Dispatcher from "./controllers/dispatcher";
import AuthController from "./controllers/authController";

class SlavDomRouter {

  public static init(): Router {
    const slavDomRouter: SlavDomRouter = new SlavDomRouter();
    slavDomRouter.initUserRoutes();
    slavDomRouter.initTranslationRoutes();
    slavDomRouter.initNewsRoutes();
    slavDomRouter.initCommonRoutes();
    slavDomRouter.initDispatchRoutes();
    slavDomRouter.initAuthRoutes();
    return slavDomRouter.router;
  }

  private router: Router = Router();
  private translationController: TranslationController;
  private newsController: NewsController;
  private commonController: CommonController;
  private userController: UserController;
  private authController: AuthController;
  private dispatcher: Dispatcher;

  constructor() {
    this.translationController = new TranslationController();
    this.newsController = new NewsController();
    this.commonController = new CommonController();
    this.userController = new UserController();
    this.authController = new AuthController();
    this.dispatcher = new Dispatcher();
  }

  public initUserRoutes(): void {
    this.router.get("/api/users/username/:identifier", this.userController.ajaxUsernameCheck.bind(this.userController));
    this.router.get("/api/users/email/:identifier", this.userController.ajaxEmailCheck.bind(this.userController));
    this.router.post("/api/users/save", this.userController.saveUser.bind(this.userController));
    this.router.get("/api/users/get", this.userController.getUser.bind(this.userController));
  }

  public initTranslationRoutes(): void {
    this.router.get("/api/translations/list",
      this.translationController.getTranslations.bind(this.translationController));
    this.router.get("/api/translations/package",
      this.translationController.getTranslationsFromList.bind(this.translationController));
    this.router.get("/api/translations/page",
      this.translationController.getTranslationsByPrefix.bind(this.translationController));
    this.router.get("/api/translations/get",
      this.translationController.getTranslation.bind(this.translationController));
    // router.post('/api/translations/save', translationController.saveTranslation);
  }

  public initNewsRoutes(): void {
    this.router.get("/api/news/list", this.newsController.getNewsPage.bind(this.newsController));
    this.router.get("/api/news/get", this.newsController.getNews.bind(this.newsController));
    this.router.post("api/news/save", this.newsController.saveNews.bind(this.newsController));
  }

  public initCommonRoutes(): void {
    this.router.post("/api/common/mail", CommonController.mailSender);
  }

  public initDispatchRoutes(): void {
    this.router.get("/api/dispatch/news_translations", this.dispatcher.translationPageAndNews.bind(this.dispatcher));
  }

  public initAuthRoutes(): void {
    this.router.post("/api/auth", this.authController.auth.bind(this.authController));
  }

}

export default SlavDomRouter.init();
