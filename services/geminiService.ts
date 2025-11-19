import { GoogleGenAI, Type } from "@google/genai";
import { ArticleData, Tone } from "../types";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real env, we check for existence. Here we assume it's injected.

const ai = new GoogleGenAI({ apiKey });

export const generateArticle = async (topic: string, tone: Tone): Promise<ArticleData> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    You are a world-class professional content writer fluent in Arabic. 
    Your task is to write a high-quality, SEO-optimized article about the following topic: "${topic}".
    
    Tone of voice: ${tone}.
    
    Follow these strict rules:
    1. Analyze the topic and extract main keywords first.
    2. Suggest 3-5 catchy, SEO-friendly titles in Arabic.
    3. Write a full article in fluent Arabic. 
       - It must have a strong introduction.
       - Use Markdown headers (## for H2, ### for H3) to structure the content.
       - Write in a human-like way. Avoid robotic or repetitive phrases.
       - Do NOT use AI-cliches like "In conclusion" or "In this article we will discuss".
       - Ensure smooth transitions between paragraphs.
    4. Create a Meta Description (between 140-155 characters) in Arabic.
    5. Provide a list of target keywords at the end.

    Output the result in valid JSON format adhering to the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of extracted main keywords from the topic analysis"
            },
            suggestedTitles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-5 SEO optimized titles in Arabic"
            },
            articleBody: {
              type: Type.STRING,
              description: "The full article content in Markdown format (using ## and ###)"
            },
            metaDescription: {
              type: Type.STRING,
              description: "SEO meta description between 140-155 characters"
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of related SEO keywords"
            }
          },
          required: ["analysis", "suggestedTitles", "articleBody", "metaDescription", "keywords"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");

    const data = JSON.parse(text) as ArticleData;
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
