import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectMongoDB();
        
        const { email, password } = await req.json();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Return user data (excluding password)
        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        return NextResponse.json(
            { 
                message: "Signin successful",
                user: userWithoutPassword
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Signin error:', error);
        return NextResponse.json(
            { message: "An error occurred during signin" },
            { status: 500 }
        );
    }
}
