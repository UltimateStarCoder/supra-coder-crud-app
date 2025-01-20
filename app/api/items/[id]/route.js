import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { name, description, quantity } = await request.json();

        await connectToDatabase();
        
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, description, quantity },
            { new: true }
        );

        if (!updatedItem) {
            return NextResponse.json(
                { message: "Item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedItem);
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating item" },
            { status: 500 }
        );
    }
}
