import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await Item.find({});
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching items" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name, description, quantity, createdBy } = await request.json();

        if (!name || !description || !quantity) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newItem = await Item.create({
            name,
            description,
            quantity,
            createdBy
        });

        return NextResponse.json(
            { message: "Item created successfully", item: newItem },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating item" },
            { status: 500 }
        );
    }
}
