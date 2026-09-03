const { GoogleGenAI } = require('@google/genai');

function buildPrompt({ topic, level, makeDifferent }) {
  const styleGuide = {
    'Explain like 5': 'Use very simple words, short sentences, and playful analogies.',
    'Explain like 12': 'Use clear, friendly language with a little more detail.',
    Detailed: 'Use a structured answer with concise depth and practical examples.',
  }[level] || 'Use clear, friendly language.';

  const variationNote = makeDifferent
    ? 'Give a noticeably different explanation than the last one. Use fresh examples and wording.'
    : 'Give the best first explanation.';

  return `You are Explain Like I\'m 5 AI.
Return ONLY valid JSON with this exact shape:
{
  "title": "string",
  "explanation": "string",
  "examples": ["string", "string"],
  "keyPoints": ["string", "string", "string"]
}

Rules:
- Topic: ${topic}
- Level: ${level}
- Style: ${styleGuide}
- ${variationNote}
- No markdown.
- No code fences.
- Keep the explanation helpful and easy to understand.`;
}

function extractJson(text) {
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const startIndex = trimmed.indexOf('{');
    const endIndex = trimmed.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      throw new Error('Gemini returned an invalid response format');
    }

    return JSON.parse(trimmed.slice(startIndex, endIndex + 1));
  }
}

async function generateExplanation({ topic, level, makeDifferent }) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing from backend/.env');
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  let response;

  try {
    response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildPrompt({ topic, level, makeDifferent }),
      config: {
        temperature: makeDifferent ? 0.9 : 0.7,
        responseMimeType: 'application/json',
      },
    });
  } catch (error) {
    throw new Error(`Gemini request failed: ${error.message}`);
  }

  const text = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini response was empty');
  }

  const parsed = extractJson(text);

  return {
    title: parsed.title || `${topic} made simple`,
    explanation: parsed.explanation || '',
    examples: Array.isArray(parsed.examples) ? parsed.examples : [],
    keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
  };
}

module.exports = { generateExplanation };
