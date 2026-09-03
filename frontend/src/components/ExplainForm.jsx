import { motion } from 'framer-motion';

const levels = ['Explain like 5', 'Explain like 12', 'Detailed'];

function ExplainForm({
  topic,
  level,
  loading,
  onTopicChange,
  onLevelChange,
  onSubmit,
}) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onSubmit={onSubmit}
      className="mx-auto mt-8 w-full max-w-3xl"
    >
      <div className="rounded-3xl border border-white/50 bg-white/70 p-3 shadow-[0_20px_60px_-35px_rgba(37,99,235,0.5)] backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-900/60">
        <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <label className="sr-only" htmlFor="topic-input">
            Topic
          </label>
          <input
            id="topic-input"
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
            placeholder="Try: quantum computing, inflation, neural networks..."
            className="h-14 w-full rounded-2xl border border-slate-200/70 bg-white px-4 text-[15px] text-slate-800 outline-none ring-blue-500/60 transition-all placeholder:text-slate-400 focus:ring-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            required
          />

          <label className="sr-only" htmlFor="level-select">
            Explanation level
          </label>
          <select
            id="level-select"
            value={level}
            onChange={(event) => onLevelChange(event.target.value)}
            className="h-14 rounded-2xl border border-slate-200/70 bg-white px-4 text-sm font-medium text-slate-700 outline-none ring-blue-500/50 transition-all focus:ring-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-400/35 transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Explaining...' : 'Explain Now'}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}

export default ExplainForm;
