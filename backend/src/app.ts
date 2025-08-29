import express, {Application, Request, Response} from 'express';
import {PORT} from "./config/env";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import taskRouter from "./routes/task.routes";
import projectRouter from "./routes/project.routes";
import authRouter from "./routes/auth.routes";
import {authorize} from "./middlewares/auth.middleware";


const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', authorize, userRouter);
app.use('/api/v1/tasks', authorize, taskRouter);
app.use('/api/v1/projects', authorize, projectRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello to TaskFocusAI!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});