

'use client'
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(name, email);
  }, [name, email]);

  const handleClick = async() => {
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name
        })
      })

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // Send the form data to your server
  };

  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={handleClick}> Click </Button>
    </div>
  );
}
