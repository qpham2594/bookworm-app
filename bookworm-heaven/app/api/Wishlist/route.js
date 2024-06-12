import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authHandler } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Wishlist from "@/app/models/wishlist";

// GET handler to fetch the wishlist
export async function GET(req) {
    try {
        await connectMongoDB();
        const session = await getServerSession(authHandler);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
        
        const wishlist = await Wishlist.find({ userId: user._id });
        return NextResponse.json({ wishlist });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST handler to add to the wishlist
export async function POST(req) {
    try {
        await connectMongoDB();
        const session = await getServerSession(authHandler);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, title, author, description, image } = body;
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const existWishlist = await Wishlist.findOne({ userId: user._id, id });
        if (existWishlist) {
            await Wishlist.updateOne({ userId: user._id, id }, { title, author, description, image });
        } else {
            await Wishlist.create({ userId: user._id, id, title, author, description, image });
        }

        return NextResponse.json({ message: "Added to Wishlist" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Unable to add to wishlist", error: error.message }, { status: 500 });
    }
}

// DELETE handler to remove from the wishlist
export async function DELETE(req) {
    try {
        await connectMongoDB();
        const session = await getServerSession(authHandler);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id } = body;
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        await Wishlist.deleteOne({ userId: user._id, id });

        return NextResponse.json({ message: "Removed from Wishlist" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Unable to remove from wishlist", error: error.message }, { status: 500 });
    }
}
