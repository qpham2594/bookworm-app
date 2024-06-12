import { connectMongoDB } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authHandler } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Favorites from "@/app/models/favorites";

export async function GET(req) {
    try {
        await connectMongoDB();
        const session = await getServerSession(authHandler);
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized." },
                { status: 401 }
            );
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }
        
        const favorites = await Favorites.find({ userId: user._id });
        return NextResponse.json({ favorites });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectMongoDB();
        const session = await getServerSession(authHandler);
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { id, title, author, description, image } = body;
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const existFavorite = await Favorites.findOne({ userId: user._id, id });
        if (existFavorite) {
            await Favorites.updateOne(
                { userId: user._id, id },
                { title, author, description, image }
            );
        } else {
            await Favorites.create({
                userId: user._id,
                id,
                title,
                author,
                description,
                image
            });
        }

        return NextResponse.json(
            { message: "Added to Favorites" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Unable to add to favorites", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await connectMongoDB();
        const session = await getServerSession(authHandler);
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { id } = body;
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        await Favorites.deleteOne({ userId: user._id, id });

        return NextResponse.json(
            { message: "Removed from Favorites" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Unable to remove from favorites", error: error.message },
            { status: 500 }
        );
    }
}
