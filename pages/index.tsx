import React, { useState } from "react";
import "../app/globals.css";

export default function Home() {
  const [value, setValue] = useState("");
  const [completion, setCompletion] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOnClick = async () => {
    setCompletion("Loading..");
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: value }),
      });
      const data = await response.json();

      if (response.ok && data.result && data.result.choices && data.result.choices.length > 0) {
        setCompletion(data.result.choices[0].text);
      } else {
        setCompletion("Error: Invalid response received");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setCompletion("Error: An error occurred while processing the request");
    } finally {
      setValue("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Enter a prompt:</h2>
      </div>
      <input
        className="px-4 py-2 border border-gray-300 rounded-md w-64 mb-4"
        value={value}
        onChange={handleInput}
      />
      <button className="bg-black p-3 text-white hover:bg-gray-600 rounded-full" onClick={handleOnClick}>
        Generate
      </button>
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Output: {completion}</h2>
      </div>
    </div>
  );
}
