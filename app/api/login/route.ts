import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    (await cookies()).set("session-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    return NextResponse.json({ message: error  }, { status: 500 });
  }
}
