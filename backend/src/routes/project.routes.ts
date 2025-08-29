import { Router } from 'express';
import { createProject, getProjectById, getProjects } from '../controllers/project.controller';

const projectRouter = Router();

projectRouter.get('/', getProjects);
projectRouter.post('/', createProject);
projectRouter.get('/:projectId', getProjectById);

export default projectRouter;
