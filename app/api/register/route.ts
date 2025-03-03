import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";


export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        }
    })
    

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
