// app/api/explain-verse/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    const { chapter, verse, sanskrit, english } = await request.json();

    try {
        const prompt = `Explain the following verse from the Bhagavad Gita in a concise manner, focusing on its spiritual and philosophical significance:

Chapter: ${chapter}
Verse: ${verse}
Sanskrit: ${sanskrit}
English Translation: ${english}

Provide an explanation that is easy to understand for a general audience while capturing the essence of the verse. Keep it short and simple.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // You might want to adjust this to an available model
            messages: [
                {
                    role: "system",
                    content: "You are a knowledgeable scholar of the Bhagavad Gita, providing insights and explanations.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 500, // Adjust this based on the desired length of the explanation
        });

        const explanation = completion.choices[0].message.content;

        return new NextResponse(JSON.stringify({ explanation }), { status: 200 });
    } catch (error: any) {
        console.error(`Error generating explanation: ${error.message}`);
        return new NextResponse("Error generating explanation", { status: 500 });
    }
}