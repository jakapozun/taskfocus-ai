import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const user = await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john@example.com",
                password: "hashed"
            }
        });

        console.log("✅ User created:", user);

        const allUsers = await prisma.user.findMany();
        console.log("📌 All users:", allUsers);
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
