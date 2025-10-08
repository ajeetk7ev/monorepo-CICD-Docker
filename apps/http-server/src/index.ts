import express from 'express';
import { prisma } from '@repo/db/client'
const app = express();
app.use(express.json());

app.get("/api/user", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //create user 
        await prisma.user.create({
            data: {
                email,
                password
            }
        })

        return res.status(201).json({
            success: true,
            message: "User created"
        })
    } catch (error) {
        console.log("Failed to create user", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }


})

app.listen(5000, () => {
    console.log("Server is running at port 5000")
})