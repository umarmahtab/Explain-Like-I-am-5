import { motion } from 'framer-motion';
import { History } from 'lucide-react';

function HistorySidebar({ items, onSelect, activeId }) {
  return (
    <aside className="hidden w-80 shrink-0 xl:block">
      <div className="sticky top-6 rounded-3xl border border-white/40 bg-white/70 p-4 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          <History size={16} />
          Recent Topics
        </div>
        <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {items.length === 0 && (
            <p className="rounded-2xl bg-slate-100/70 px-3 py-4 text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              Your explained topics will appear here.
            </p>
          )}
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => onSelect(item)}
                className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                  isActive
                    ? 'border-blue-300 bg-blue-50/90 dark:border-blue-500/60 dark:bg-blue-950/40'
                    : 'border-slate-200/70 bg-white/70 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-slate-600'
                }`}
              >
                <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{item.topic}</p>
                <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{item.level}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default HistorySidebar;
