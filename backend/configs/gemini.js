import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // dir string toos ah, JSON badan looma baahna
  const result = await model.generateContent(
    `${prompt}\n\nWrite a blog article in markdown format only. Do NOT include <html>, <head>, or <body> tags.`
  );

  return result.response.text();
}

export default main;
