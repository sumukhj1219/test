import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not set");
      return NextResponse.json({ message: "JWT_SECRET is missing" }, { status: 500 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      console.error(`❌ User not found for email: ${email}`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error(`❌ Invalid password for user: ${email}`);
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    cookies().set("session-token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production" 
    });

    console.log(`✅ Login successful for ${email}`);
    return NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email } });

  } catch (error: any) {
    console.error("🔥 Login Error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
