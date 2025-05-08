import { Router } from "express";
import TasksController from "../controller/Tasks.controller";
import { sendResponse } from "../utils/conifg";
import { UserAuth } from "../middleware/User.moddlewares";

const router = Router();

const tasksController = new TasksController();
const userAuth = new UserAuth();
router
  .route("/task")
  .post(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.createTask(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task")
  .get(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.getAllTasks(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task/:taskId")
  .get(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.getTaskById(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task/:taskId")
  .post(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.updateTask(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );
router
  .route("/task/:taskId")
  .delete(
    userAuth.authenticateToken.bind(userAuth),
    async (req: Request, res: Response) => {
      try {
        tasksController.deleteTask(req, res);
      } catch (error) {
        sendResponse(res, 500, error.message);
      }
    }
  );

module.exports = router;
