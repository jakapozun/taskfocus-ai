import {prisma} from "../../prisma/client";

export const createTask = async (req: any, res: any, next: any) => {
    const {title, projectId} = req.body;

    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                projectId
            }
        });

        res.status(201).json(newTask);
    } catch (error){
        next(error);
    }
}

export const getAllTasks = async (req: any, res: any, next: any) => {
    try{
        const tasks = await prisma.task.findMany();

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({message: 'No tasks found'});
        }

        res.status(200).json(tasks);
    } catch (error){
        next(error);
    }
}