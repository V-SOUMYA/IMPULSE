import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function runGemini(question) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro"
  });

  const prompt = `
You are a physics simulation engine.

Your task is to convert ANY physics concept or question into structured JSON
that can be used to render an animation.

STRICT RULES:
- Output ONLY valid JSON
- No markdown, no extra text
- Use classical physics unless stated otherwise
- Use SI units
- Choose reasonable defaults if values are missing
- Generate at least 6 time steps

OUTPUT FORMAT:
{
  "concept": string,
  "objects": [
    {
      "id": string,
      "type": "particle | rigid_body | wave | ray | field_source",
      "shape": "point | circle | rectangle | arrow | line",
      "properties": {
        "mass": number,
        "charge": number
      }
    }
  ],
  "environment": {
    "gravity": number,
    "medium": string
  },
  "interactions": [
    {
      "type": "force | field | constraint",
      "name": string,
      "source": string,
      "target": string
    }
  ],
  "motion": [
    {
      "time": number,
      "object_id": string,
      "position": { "x": number, "y": number },
      "velocity": { "x": number, "y": number }
    }
  ],
  "annotations": [string],
  "explanation": string
}

USER QUESTION:
${question}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
}
