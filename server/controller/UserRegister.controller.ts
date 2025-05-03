import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY, sendResponse } from "../utils/conifg";
import { User_Tasks_Model } from "../models/User_Tasks.model";

export class UserRegisterController {
    private userModel: User_Tasks_Model;

    constructor() {
        this.userModel = new User_Tasks_Model();
    }

    private createToken(email: string, name: string): string {
        return jwt.sign({ name, email }, SECRET_KEY, {
            expiresIn: "5h",
        });
    }

    async signUp(req: Request, res: Response) {
        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return sendResponse(res, 400, { error: "Name, email and password are required" });
            }
            const existingUser = await this.userModel.getUserByEmail(email);
            if (existingUser) {
                return sendResponse(res, 409, { error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await this.userModel.createUser({
                name,
                email,
                password: hashedPassword
            });

            const token = this.createToken(newUser.email, newUser.name);

            return sendResponse(res, 201, {
                token,
                user: {
                    name: newUser.name,
                    email: newUser.email
                }
            });
        } catch (error) {
            console.error("Signup error:", error);
            return sendResponse(res, 500, { error: "Internal server error" });
        }
    }
}

export default UserRegisterController;