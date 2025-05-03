import { Schema } from "mongoose";
import {IUser} from '@fullstack/to_do_list';
import {TasksSchema} from  "./Tasks.schema";

export const UsersSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: { type: [TasksSchema], required: false },
  });