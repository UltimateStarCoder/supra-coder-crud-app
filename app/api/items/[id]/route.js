import { connectToDatabase } from "@/lib/mongodb";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { name, description, quantity, createdBy } = await request.json();

        await connectToDatabase();
        
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, description, quantity, createdBy },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return NextResponse.json(
                { message: "Item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { message: "Error updating item", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const createdBy = searchParams.get("createdBy");

        if (!createdBy) {
            return NextResponse.json(
                { message: "CreatedBy parameter is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const items = await Item.find({ createdBy }).sort({ createdAt: -1 });
        return NextResponse.json(items || [], { status: 200 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json(
            { message: "Error fetching items", error: error.message },
            { status: 500 }
        );
    }
}
