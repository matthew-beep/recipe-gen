'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type recipe = {
  title: string;
  prep: string;
  ingredients: string[];
  steps: string[];
}


export default function Landing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<recipe | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleRecipe = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/generate", {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: {"Content-Type" : "application/json"},
      })

      const { text } = await res.json();
      console.log("res", text);
      setRecipe(JSON.parse(text.substring(7, text.length - 4)));
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

  const handleDelete = (valueToRemove: string) => {
    setIngredients(prev => prev.filter(item => item !== valueToRemove));
  };
  

  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)] p-5">
      <h1 className="text-3xl font-bold">
        <span>Pantry</span>Chef
      </h1>
      <main className="w-11/12 flex flex-col gap-5">
        <Card className="p-3 gap-5 flex flex-col">
          <CardHeader className="p-0 text-xl font-bold">
            What Ingredients do you have?
          </CardHeader>
          <CardContent className="flex flex-col w-full gap-3 p-0">
            <div className="flex gap-2">
              <Input placeholder="Enter Ingredient" value={text} onChange={(e) => {setText(e.target.value)}}/>
              <Button onClick={handleClick} className="bg-white text-black border border-solid border-[#cccccc]">Add</Button>
            </div>
            <div className="flex gap-2">
              <ul className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="bg-[#cccccc] rounded-full flex items-center justify-start w-auto px-2 gap-1">{ingredient} <span onClick={() => handleDelete(ingredient)} className="rounded-full hover:bg-[#333333] cursor-pointer">x</span></li>
                ))}
              </ul>
            </div>
            
          </CardContent>
          <CardFooter className="p-0">
            <Button onClick={handleRecipe} className="w-full">Generate Recipe</Button>
          </CardFooter>
        </Card>
        <section>
          {loading ? (
              <div className="flex flex-col space-y-3 w-full">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
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
