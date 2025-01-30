// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: Request) {
//   if (!process.env.OPENAI_API_KEY) {
//     return NextResponse.json(
//       { error: "OpenAI API key is not configured" },
//       { status: 500 }
//     );
//   }

//   try {
//     const { message } = await req.json();

//     if (!message) {
//       return NextResponse.json(
//         { error: "Message is required" },
//         { status: 400 }
//       );
//     }

//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: message }],
//       model: "gpt-3.5-turbo",
//     });

//     const aiResponse = completion.choices[0].message.content;

//     if (!aiResponse) {
//       return NextResponse.json(
//         { error: "No response from AI" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ response: aiResponse });
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return NextResponse.json(
//       { error: "There was an error processing your request" },
//       { status: 500 }
//     );
//   }
// }

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
