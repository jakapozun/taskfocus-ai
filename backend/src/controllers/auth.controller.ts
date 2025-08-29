import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import * as bycrypt from 'bcryptjs';
import { JWT_SECRET } from '../config/env';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: '1d' });

    return res.status(200).json({ token, userId: user.id, name: user.name });
  } catch (error) {
    next(error);
  }
};
