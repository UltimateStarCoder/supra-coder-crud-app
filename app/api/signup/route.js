import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Return user data without password
        const userData = {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email
        };

        return NextResponse.json(
            { 
                message: "User created successfully",
                user: userData 
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating user" },
            { status: 500 }
        );
    }
}
