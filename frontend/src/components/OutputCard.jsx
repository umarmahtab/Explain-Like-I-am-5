import { motion } from 'framer-motion';
import { Copy, RefreshCcw } from 'lucide-react';
import TypingText from './TypingText';

function OutputCard({ data, onRegenerate, onCopy, loading }) {
  if (!data) return null;

  return (
    <motion.section
      id="output"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-3xl border border-white/50 bg-white/65 p-6 shadow-[0_24px_80px_-45px_rgba(79,70,229,0.55)] backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-900/60"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Title</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{data.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRegenerate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500"
          >
            <RefreshCcw size={15} />
            Explain again differently
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white"
          >
            <Copy size={15} />
            Copy
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        <article>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Explanation</p>
          <TypingText text={data.explanation} triggerKey={data.id} />
        </article>

        <article>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Examples</p>
          <ul className="space-y-2">
            {data.examples.map((example) => (
              <li key={example} className="rounded-2xl bg-slate-100/70 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                {example}
              </li>
            ))}
          </ul>
        </article>

        <article>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Key Points</p>
          <ul className="space-y-2">
            {data.keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </motion.section>
  );
}

export default OutputCard;
