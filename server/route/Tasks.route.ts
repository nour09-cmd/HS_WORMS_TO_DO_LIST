import { Router } from "express";
import TasksController from "../controller/Tasks.controller";
import { sendResponse } from "../utils/conifg";
import { UserAuth } from "../middleware/User.moddlewares";

const router = Router();

const tasksController = new TasksController();
const userAuth = new UserAuth();
router.route("/:email/tasks").post(  userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    tasksController.createTask(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/:email/tasks").get( userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    tasksController.getAllTasks(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/:email/tasks/:taskId").get( userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    tasksController.getTaskById(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/:email/tasks/:taskId").post( userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    tasksController.updateTask(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});
router.route("/:email/tasks/:taskId").delete( userAuth.authenticateToken.bind(userAuth),async (req: Request, res: Response) => {
  try {
    tasksController.deleteTask(req, res);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
});

  module.exports = router;