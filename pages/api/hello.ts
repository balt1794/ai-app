import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

console.log(process.env); // Add this line to log the environment variables

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(completion); // Add this line to log the completion object

      res.status(200).json({result: completion.data});
}


