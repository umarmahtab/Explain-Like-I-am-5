import { motion } from 'framer-motion';
import { MoonStar, Sun } from 'lucide-react';

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-xl transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} /> : <MoonStar size={16} />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </motion.button>
  );
}

export default ThemeToggle;
