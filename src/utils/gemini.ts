import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function generateGeminiReply(prompt: string): Promise<string> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    if (!response || !response.text) {
        throw new Error('Failed to generate response from Gemini');
    }
    return response.text;
};

