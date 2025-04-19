'use client'
import { useEffect, useState } from "react";
//import GoogleGenerativeAI  from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type recipe = {
  title: string;
  prep: string;
  ingredients: string[];
  steps: string[];
}

async function generateRecipe() {

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEM_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "What recipe can i make with chicken, rice, and lettuce? Give me the response as a json object as {title: string, prep: string, ingredients: [], steps: []";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();

}

export default function Landing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<recipe | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    
  }, [ingredients])
  
  const handleRecipe = async () => {
    setLoading(true);
    try {
      const recipeText:string = await generateRecipe();
      setRecipe(JSON.parse(recipeText.substring(7, recipeText.length - 4)));
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleClick = () => {
    if (text && !ingredients.includes(text)) {
      setIngredients([...ingredients, text]);
    }
    setText("");
  }

  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)] p-5">
      <h1 className="text-3xl font-bold">
        <span>Pantry</span>Chef
      </h1>
      <main className="w-11/12 flex flex-col gap-5">
        <Card className="p-3">
          <CardHeader className="p-0 text-xl font-bold">
            What Ingredients do you have?
          </CardHeader>
          <CardContent className="flex flex-col w-full gap-2 p-0">
            <div className="flex gap-2">
              <Input placeholder="Enter Ingredient" value={text} onChange={(e) => {setText(e.target.value)}}/>
              <Button onClick={handleClick} className="bg-white text-black border border-solid border-[#cccccc]">Add</Button>
            </div>
            <div className="flex gap-2">
              <ul className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="bg-[#cccccc] rounded-full flex items-center justify-start w-auto px-2 gap-1">{ingredient} <span className="font-bold">x</span></li>
                ))}
              </ul>
            </div>
            <Button onClick={handleRecipe}>Generate Recipe</Button>
          </CardContent>
        </Card>
        <section>
          {loading ? (
              <div className="flex flex-col space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              </div>
          ) : recipe && (
            <Card className="p-3 flex flex-col gap-5">
              <CardHeader className="p-0">
                <h1 className="text-lg font-semibold">{recipe.title}</h1>
                <p>Prep: {recipe.prep}</p>
              </CardHeader>
              <ul className="list-inside list-disc">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <ol className="list-inside list-decimal">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <Button className="w-full">Save</Button>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
