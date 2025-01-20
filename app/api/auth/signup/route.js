import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

export async function POST(req) {
    try {
        // Log the request body for debugging
        const body = await req.json();
        console.log('Received signup request:', { ...body, password: '[REDACTED]' });

        const { name, email, password } = body;

        // Validation
        if (!name || !email || !password) {
            console.log('Missing fields:', { name: !!name, email: !!email, password: !!password });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check MongoDB connection status
        if (mongoose.connection.readyState !== 1) {
            console.log('MongoDB connection state:', mongoose.connection.readyState);
            await connectDB();
        }

        // Check for existing user
        const existingUser = await User.findOne({ email }).select('_id');
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        });

        // Return success response
        return NextResponse.json(
            { 
                message: "User created successfully",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            },
            { status: 201 }
        );

    } catch (error) {
        // Detailed error logging
        console.error('Signup error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // More specific error messages
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                error: "Server error during signup",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
