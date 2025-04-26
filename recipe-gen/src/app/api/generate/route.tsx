import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { ingredients } = await req.json();
    console.log(ingredients)
  let str = "";
  for (let i = 0; i < ingredients.length; i++) {
    if (i + 1 != ingredients.length) {
      str += ingredients[i] + ", ";
    } else {
      str += "and " + ingredients[i];
    }
  }

  const prompt = `What recipe can i make with ${str}? Give me the response as a json object as {title: string, prep: string, ingredients: [], steps: []`;
  console.log(prompt);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEM_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  return NextResponse.json({ text });
}