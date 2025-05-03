import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../utils/conifg";
import jwt from "jsonwebtoken";
import { User_Tasks_Model } from "../models/User_Tasks.model";


export class UserAuth{
     private userModel: User_Tasks_Model;
    
        constructor() {
            this.userModel = new User_Tasks_Model();
        }

      async authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header("Authorization");
        const token = authHeader;
    
        if (!token)
          return res
            .status(401)
            .send({ message: "Access denied. No token provided." });
    
        try {
          const decoded = jwt.verify(token, SECRET_KEY);
          const { name, email } = decoded;
          const user = await this.userModel.getUserByEmail(email);
          if (!user)
            return res
              .status(401)
              .send({ message: "Access denied. Invalid token." });
    
          req["user"] = { name, email };
    
          next();
        } catch (error) {
          return res.status(400).send({ message: "Invalid token" });
        }
      }

}