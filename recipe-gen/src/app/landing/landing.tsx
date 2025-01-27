'use client'
import { useState } from "react";
//import GoogleGenerativeAI  from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

type recipe = {
  title: string;
  prep: string;
  ingredients: string[];
  steps: string[];
}

type ingredient = {
  name: string;
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
  const [ingredients, setIngredients] = useState([]);

  const handleClick = async () => {
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

  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <main className="w-11/12 flex flex-col ">
        <Button onClick={handleClick}>Click Me</Button>
        {loading ? (
            <div className="flex flex-col space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            </div>
        ) : (
          <div>
            {recipe && (
              <div>
                <h1>{recipe.title}</h1>
                <p>Prep: {recipe.prep}</p>
                <ul className="list-inside list-disc">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <ol className="list-inside list-disc">
                  {recipe.steps.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
        <Input />
      </main>
    </div>
  );
}
