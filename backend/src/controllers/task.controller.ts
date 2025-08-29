import { prisma } from '../../prisma/client';
import { GEMINI_API_KEY } from '../config/env';

export const createTask = async (req: any, res: any, next: any) => {
  try {
    const { title, projectId, description } = req.body;

    if (!description || !projectId) {
      return res.status(400).json({ message: 'Description and Project ID are required' });
    }

    let aiDescription: string = '';
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY!,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Summarize a detailed task description for the following: ${description} in max 2 sentences.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        console.error('Gemini API Error:', await response.text());
        return 'AI summary unavailable';
      }
      const data = await response.json();
      console.log(data);
      aiDescription = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Summary not available';
    } catch (err) {
      console.error('Error generating AI description:', err);
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        projectId,
        description,
        ai_description: aiDescription,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req: any, res: any, next: any) => {
  try {
    const tasks = await prisma.task.findMany();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
