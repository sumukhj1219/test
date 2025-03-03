import { NextResponse } from "next/server";
import auth from "@/auth/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

const apiKey = "AIzaSyBurf-AdFvuisERA9Upqm-f4fRpbnaLhWA";
const genAI = new GoogleGenerativeAI(apiKey);

const modelName = "gemini-1.5-flash";
const model = genAI.getGenerativeModel({ model: modelName });

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1024,
};

interface DecodedJWT{
    email:string | null,
    id:string,
    name:string
}

export async function POST(request: Request) {
    const decoded : DecodedJWT | null = await auth();
    console.log(decoded?.id)
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized: No session found" }, { status: 401 });
    }

    console.log("Authenticated User:", decoded);

    const { theme, title } = await request.json();
    console.log(theme, title)
    if (!theme || !title) {
      return NextResponse.json({ message: "Theme and Title are required" }, { status: 400 });
    }

    const chatSession = model.startChat({ generationConfig, history: [] });
    const prompt = `
      Generate a hackathon project idea based on the following details:

      **Theme:** ${theme}
      **Title:** ${title}

      Provide:
      1. **Description** (Overview of the brief idea)
      2. **Implementation** (How it will be built e.g., Tech stack, resources, app or website, in-depth implementation)
      3. **Uniqueness** (Why this idea is innovative)

     
    `;

    const result = await chatSession.sendMessage(prompt);
    const generatedIdea =  result.response.text() || "Failed to generate idea.";
    console.log(generatedIdea)
    if (generatedIdea === "") {
      return NextResponse.json({ message: "Unable to generate the response." }, { status: 400 });
    }


    try {
      console.log("Inserting data ", {title: title,
        theme: theme,
        response: "",
        userId: decoded.id.toString()})
      const userIdea = await prisma.ideas.create({
        data: {
          title: title,
          theme: theme,
          response: generatedIdea,
          userId: decoded.id.toString(), 
        },
      });
      return NextResponse.json({ message: {id:userIdea.id, title, theme} }, { status: 200 });
      
    } catch (err) {
      console.error("Error inserting idea:", err);
      return NextResponse.json({ message: "Database insertion failed" }, { status: 500 });
    }
   
  } 
