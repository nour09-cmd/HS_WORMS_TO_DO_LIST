import express, { Request, Response } from "express";
import { PORT } from "../utils/conifg";

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req: Request, res: Response) => {
    res.send("Hello, From our backend");
});

// routes
const userRoute = require("../route/Auth.route");
const tasksRoute = require("../route/Tasks.route");

app.use("/api/auth", userRoute);
app.use("/api/tasks", tasksRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});