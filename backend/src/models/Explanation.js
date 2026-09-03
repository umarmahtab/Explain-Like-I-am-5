const mongoose = require('mongoose');

const explanationSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['Explain like 5', 'Explain like 12', 'Detailed'],
      required: true,
    },
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    examples: { type: [String], default: [] },
    keyPoints: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Explanation', explanationSchema);
