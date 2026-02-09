import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runGemini } from "./gemini.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/simulate", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const simulation = await runGemini(question);
    res.json(simulation);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini simulation failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
