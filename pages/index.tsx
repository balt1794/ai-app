import React, { useState } from "react"
import "../app/globals.css"
export default function Home() {

  const [value, setValue] = React.useState<string>("");
  const [completion, setCompletion] = React.useState<string>("");

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []
  );

  const handleOnClick = async () =>{
    setCompletion("Loading...");
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: value }),
    });
    const data = await response.json();
    setValue('');
    setCompletion(data.result.choices[0].text)
  };
  
  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
    <div className="mb-4">
      <h2 className="text-2xl font-bold">Enter a prompt:</h2>
    </div>
    <input className="px-4 py-2 border border-gray-300 rounded-md w-64 mb-4" value={value} onChange={handleInput} />
    <button className="bg-black p-3 text-white hover:bg-gray-600 rounded-full"onClick={handleOnClick}>Generate</button>
    <div className="mt-4">
      <h2 className="text-2xl font-bold">Output:{completion}</h2>
    </div>
  </div>
  );
}
