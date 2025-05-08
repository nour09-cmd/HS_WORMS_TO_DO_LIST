import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY, sendResponse } from "../utils/conifg";
import { User_Tasks_Model } from "../models/User_Tasks.model"; 

export class UserLoginController {
    private userModel: User_Tasks_Model;

    constructor() {
        this.userModel = new User_Tasks_Model();
    }

    private createToken(email: string, name: string): string {
        return jwt.sign({ name, email }, SECRET_KEY, {
            expiresIn: "5h",
        });
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return sendResponse(res, 400, { error: "Email and password are required" });
            }

            const user = await this.userModel.getUserByEmail(email);
            if (!user) {
                return sendResponse(res, 401, { error: "Invalid credentials" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return sendResponse(res, 401, { error: "Invalid credentials" });
            }

            const token = this.createToken(user.email, user.name);
            
            return sendResponse(res, 201, {
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("Login error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }

    async isValidToken(req: Request, res: Response){
        return sendResponse(res, 200,{status:true});
    }
}

export default UserLoginController;