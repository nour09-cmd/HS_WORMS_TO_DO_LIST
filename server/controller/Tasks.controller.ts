import { Request, Response } from "express";
import { sendResponse } from "../utils/conifg";
import { User_Tasks_Model } from "../models/User_Tasks.model";
import mongoose from "mongoose";

export class TasksController {
    private userModel: User_Tasks_Model;

    constructor() {
        this.userModel = new User_Tasks_Model();
    }

    private isDuplicateTask(tasks: any[], newTask: any): boolean {
        return tasks.some(task => 
            task.title === newTask.title && 
            task.description === newTask.description &&
            new Date(task.dueDate).getTime() === new Date(newTask.dueDate).getTime()
        );
    }

    async createTask(req: Request, res: Response) {
        try {
            const { email } =   req["user"];
            const taskData = req.body;

            if (!email || !taskData.title) {
                return sendResponse(res, 400, { error: "Email and task title are required" });
            }

            const user = await this.userModel.getUserByEmail(email);
            if (!user) {
                return sendResponse(res, 404, { error: "User not found" });
            }

            if (this.isDuplicateTask(user.tasks, taskData)) {
                return sendResponse(res, 409, { error: "Task already exists" });
            }

            const taskWithId = {
                ...taskData,
                _id: new mongoose.Types.ObjectId(),
                dueDate: taskData.dueDate || new Date(),
                isCompleted: taskData.isCompleted || false
            };

            const updatedUser = await this.userModel.createTaskForUser(email, taskWithId);

            return sendResponse(res, 201, {
                task: taskWithId
            });
        } catch (error) {
            console.error("Create task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async getAllTasks(req: Request, res: Response) {
        try {
            const { email } =  req["user"];
            
            if (!email) {
                return sendResponse(res, 400, { error: "Email is required" });
            }

            const tasks = await this.userModel.getTasksForUser(email);

            return sendResponse(res, 200, {
                tasks
            });
        } catch (error) {
            console.error("Get tasks error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async getTaskById(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const { email } =  req["user"];

            if (!email || !taskId) {
                return sendResponse(res, 400, { error: "Email and task ID are required" });
            }

            const task = await this.userModel.getTaskByIdForUser(email, taskId);

            if (!task) {
                return sendResponse(res, 404, { error: "Task not found" });
            }

            return sendResponse(res, 200, {
                task
            });
        } catch (error) {
            console.error("Get task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const {  taskId } = req.params;
            const { email } =  req["user"];

            const updates = req.body;

            if (!email || !taskId) {
                return sendResponse(res, 400, { error: "Email and task ID are required" });
            }

            const existingTask = await this.userModel.getTaskByIdForUser(email, taskId);
            if (!existingTask) {
                return sendResponse(res, 404, { error: "Task not found" });
            }

            const updatedUser = await this.userModel.updateTaskForUser(
                email,
                taskId,
                {
                    ...existingTask,
                    ...updates,
                    dueDate: updates.dueDate || existingTask.dueDate
                }
            );

            if (!updatedUser) {
                return sendResponse(res, 404, { error: "User not found" });
            }

            const updatedTask = updatedUser.tasks.find(t => t._id?.toString() === taskId);

            return sendResponse(res, 200, {
                task: updatedTask
            });
        } catch (error) {
            console.error("Update task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const {  taskId } = req.params;
            const { email } =  req["user"];
            if (!email || !taskId) {
                return sendResponse(res, 400, { error: "Email and task ID are required" });
            }

            const existingTask = await this.userModel.getTaskByIdForUser(email, taskId);
            if (!existingTask) {
                return sendResponse(res, 404, { error: "Task not found" });
            }

            const updatedUser = await this.userModel.deleteTaskForUser(email, taskId);

            return sendResponse(res, 200, {
                message: "Task deleted successfully"
            });
        } catch (error) {
            console.error("Delete task error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }
}

export default TasksController;