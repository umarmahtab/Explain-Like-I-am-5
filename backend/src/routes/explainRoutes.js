const express = require('express');
const Explanation = require('../models/Explanation');
const { generateExplanation } = require('../services/geminiPlaceholder');

const router = express.Router();

router.post('/explain', async (req, res) => {
  try {
    const { topic, level, makeDifferent = false } = req.body;

    if (!topic || !level) {
      return res.status(400).json({ error: 'topic and level are required' });
    }

    const aiResult = await generateExplanation({ topic, level, makeDifferent });

    const saved = await Explanation.create({
      topic,
      level,
      ...aiResult,
    });

    return res.status(201).json({
      explanation: {
        id: saved._id,
        topic: saved.topic,
        level: saved.level,
        title: saved.title,
        explanation: saved.explanation,
        examples: saved.examples,
        keyPoints: saved.keyPoints,
        createdAt: saved.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

router.get('/history', async (_req, res) => {
  try {
    const items = await Explanation.find().sort({ createdAt: -1 }).limit(30);

    return res.json({
      history: items.map((item) => ({
        id: item._id,
        topic: item.topic,
        level: item.level,
        title: item.title,
        explanation: item.explanation,
        examples: item.examples,
        keyPoints: item.keyPoints,
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

module.exports = router;
