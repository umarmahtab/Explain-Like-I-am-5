const levelGuides = {
  'Explain like 5': {
    tone: 'super simple, playful, and friendly',
    depth: 'very short sentences with easy words',
  },
  'Explain like 12': {
    tone: 'clear and relatable for a middle-school learner',
    depth: 'balanced detail with practical examples',
  },
  Detailed: {
    tone: 'clear, structured, and technically deeper',
    depth: 'full explanation with key details and nuance',
  },
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function generateExplanation({ topic, level, makeDifferent }) {
  const guide = levelGuides[level] || levelGuides.Detailed;
  const differentNudge = makeDifferent
    ? 'Use a fresh angle and different analogies than before.'
    : 'Use your best first-pass explanation.';

  // Placeholder for Gemini API call.
  // In production, call Gemini with GEMINI_API_KEY and parse structured output.
  const title = `${topic} made simple`;
  const explanation = [
    `${topic} is easier than it sounds when you break it into tiny pieces.`,
    `Think of it in a ${guide.tone} way, and build it one step at a time.`,
    `This version uses ${guide.depth}. ${differentNudge}`,
  ].join(' ');

  const examples = [
    `Like learning a game: first you learn the goal, then a few rules, then you practice.`,
    `Like building with blocks: small pieces click together to make something bigger.`,
  ];

  const keyPoints = [
    `${topic} becomes easier when split into small ideas.`,
    `Start with the big picture, then add details gradually.`,
    `Practice with simple examples before complex ones.`,
  ];

  return { title, explanation, examples, keyPoints };
}

module.exports = { generateExplanation };
