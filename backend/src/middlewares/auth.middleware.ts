import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env";
import {prisma} from "../../prisma/client";

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: "Authorization header missing"});
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: "Token missing"});
        }

        const decoded = jwt.verify(token, JWT_SECRET!);
        const user = await prisma.user.findUnique({where: {id: (decoded as any).userId}});
        if (!user) {
            return res.status(401).json({success: false, message: "Unauthorized: User not found"});
        }

        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: "Unauthorized", error});
    }
}