import {Router} from "express";
import {createTask, getAllTasks} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get('/', getAllTasks);
taskRouter.post('/', createTask);

export default taskRouter;