import mongoose, { Schema, Model } from "mongoose";
import {DatabaseConnection} from "../utils/mongoDBconnection";
import { ITasks, IUser } from "@fullstack/to_do_list";
import { UsersSchema } from "./Users.schema";

export class User_Tasks_Model {
  private model: Model<IUser>;
  private conn: DatabaseConnection;

  constructor() {
    this.conn = new DatabaseConnection();
    this.model =
      (mongoose.models.UserProfile as Model<IUser>) ||
      mongoose.model<IUser>("UserProfile", UsersSchema);
  }

  async createUser(userData: Omit<IUser, "tasks">): Promise<IUser> {
    await this.conn.connect();
    const user =await new this.model({ ...userData, tasks: [] });
    const data =(await user.save()).toObject();
    await this.conn.disconnect();

    return data;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    await this.conn.connect();
    const data =await this.model.findOne({ email }).lean().exec();
    await this.conn.disconnect();
    return data;
  }

  async createTaskForUser(
    email: string,
    taskData: ITasks
  ): Promise<IUser | null> {
    await this.conn.connect();
    const data =await this.model
      .findOneAndUpdate(
        { email },
        { $push: { tasks: taskData } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();

    return data;
  }

  async updateTaskForUser(
    email: string,
    taskId: string,
    updates: Partial<ITasks>
  ): Promise<IUser | null> {
    await this.conn.connect();
    const data =await this.model
      .findOneAndUpdate(
        { email, "tasks._id": taskId },
        { $set: { "tasks.$": updates } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();
    return data;
  }

  async deleteTaskForUser(
    email: string,
    taskId: string
  ): Promise<IUser | null> {
    await this.conn.connect();
    const data =await this.model
      .findOneAndUpdate(
        { email },
        { $pull: { tasks: { _id: taskId } } },
        { new: true }
      )
      .lean()
      .exec();
    await this.conn.disconnect();

    return data;
  }

  async getTasksForUser(email: string): Promise<ITasks[] | null> {
    await this.conn.connect();
    const user = await this.model
      .findOne({ email })
      .select("tasks")
      .lean()
      .exec();
    await this.conn.disconnect();

    return user?.tasks || null;
  }

  async getTaskByIdForUser(
    email: string,
    taskId: string
  ): Promise<ITasks | null> {
    await this.conn.connect();
    const user = await this.model
      .findOne({ email })
      .select("tasks")
      .lean()
      .exec();
    await this.conn.disconnect();
    return user?.tasks.find((task) => task._id?.toString() === taskId) || null;
  }
}
