import { Request, Response, Router } from "express";
import UserLoginController from "../controller/UserLogin.controller";
import UserRegisterController from "../controller/UserRegister.controller";
import { sendResponse } from "../utils/conifg";
import { UserAuth } from "../middleware/User.moddlewares";

const router = Router();

const loginController = new UserLoginController();
const registerController = new UserRegisterController();
const userAuth = new UserAuth();

router.route("/register").post(async (req: Request, res: Response) => {
  try {
    registerController.signUp(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/login").post(async (req: Request, res: Response) => {
  try {
    loginController.login(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/isValidToken").get( userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    loginController.isValidToken(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
module.exports = router;
