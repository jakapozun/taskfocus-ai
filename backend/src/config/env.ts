import { config } from 'dotenv';

config({ path: '.env' });

export const { PORT, JWT_SECRET, GEMINI_API_KEY } = process.env;
