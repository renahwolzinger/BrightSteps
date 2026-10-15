import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Endpoint for seniors to practice crafting real AI prompts and receive warm, clear coaching + response
app.post("/api/ai-sandbox", async (req, res) => {
  try {
    const { prompt, topic, skillLevel } = req.body;
    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Please enter a question or request to try." });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      res.status(503).json({
        error: "AI service is currently unavailable. Please use the built-in interactive examples.",
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `A senior learner (Skill level: ${skillLevel || "Beginner"}, Topic: ${topic || "Everyday Life"}) wrote this AI prompt: "${prompt}".
Provide:
1. A warm, clear, easy-to-read response to their prompt (maximum 90 words, no jargon).
2. A friendly "Coach's Tip" explaining why their prompt worked well or one simple detail they could add to make it even better.
3. A clarity score from 75 to 100.`,
      config: {
        systemInstruction:
          "You are a patient, encouraging technology teacher for seniors. Use warm, respectful, plain everyday language. Never use condescension or complex tech jargon.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            aiReply: {
              type: Type.STRING,
              description: "The helpful answer to the senior's prompt.",
            },
            coachTip: {
              type: Type.STRING,
              description: "One encouraging tip on how they phrased their prompt.",
            },
            clarityScore: {
              type: Type.INTEGER,
              description: "Score between 75 and 100.",
            },
            suggestedFollowUp: {
              type: Type.STRING,
              description: "A natural follow-up question the senior could ask next.",
            },
          },
          required: ["aiReply", "coachTip", "clarityScore", "suggestedFollowUp"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini model.");
    }
    const parsed = JSON.parse(text.trim());
    res.json(parsed);
  } catch (error: any) {
    console.error("AI Sandbox error:", error);
    res.status(500).json({
      error: error?.message || "Could not reach the AI tutor right now.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BrightSteps Server running on http://localhost:${PORT}`);
  });
}

startServer();
