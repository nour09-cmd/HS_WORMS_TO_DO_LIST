import { Schema } from "mongoose";
import {ITasks} from '@fullstack/to_do_list';


export const TasksSchema = new Schema<ITasks>({
    title: { type: String, required: true },
    discription: { type: String, required: true },
    dueDate: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  });