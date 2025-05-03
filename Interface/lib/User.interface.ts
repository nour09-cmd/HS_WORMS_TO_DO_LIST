import { ITasks } from "./Tasks.interface";

export interface IUser {
name:string;
email:string;
password:string;
tasks: ITasks[]
}