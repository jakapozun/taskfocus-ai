import express, {Application, Request, Response} from 'express';
import {PORT} from "./config/env";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import taskRouter from "./routes/task.routes";
import projectRouter from "./routes/project.routes";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/projects', projectRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});