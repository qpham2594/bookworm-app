import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await connectMongoDB();
    console.log("MongoDB connected successfully");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password (hashed):", hashedPassword);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Unable to register:", error);
    return NextResponse.json({ message: "Unable to register" }, { status: 500 });
  }
}
