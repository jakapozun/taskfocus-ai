import {prisma} from "../../prisma/client";


export const getUsers = async (req: any, res: any) => {
    const users = await prisma.user.findMany();

    if (!users || users.length === 0) {
        return res.status(404).json({message: 'No users found'});
    }

    res.status(200).json(users);
}