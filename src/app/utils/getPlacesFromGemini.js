import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Replace with your real API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getPlacesFromGemini(promptText) {
  // ✅ FIXED: Use correct model name for current API
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a local guide. Based on this input: "${promptText}", return a JSON list of 5 places with:
- name
- description  
- category (e.g., tourist, hospital, mall)

Output must be valid JSON only, no extra explanation.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    console.log("Gemini response:", text);

    // ✅ Better JSON parsing with error handling
    const cleanText = text.replace(/json|/g, "").trim();
    console.log(cleanText);

    return JSON.parse(cleanText);
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return [];
  }
}
