import { prisma } from '../../prisma/client';

export const createProject = async (req: any, res: any, next: any) => {
  const { name } = req.body;
  const userId = 1;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        userId,
      },
    });

    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req: any, res: any, next: any) => {
  try {
    const projects = await prisma.project.findMany();

    if (!projects) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req: any, res: any, next: any) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
      include: { tasks: true },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};
