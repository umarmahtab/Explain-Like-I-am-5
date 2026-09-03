import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ExplainForm from './components/ExplainForm';
import HistorySidebar from './components/HistorySidebar';
import LoadingSpinner from './components/LoadingSpinner';
import OutputCard from './components/OutputCard';
import ThemeToggle from './components/ThemeToggle';
import { fetchHistory, requestExplanation } from './lib/api';

function App() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Explain like 5');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const outputRef = useRef(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('eli5-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('eli5-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const items = await fetchHistory();
        setHistory(items);
      } catch {
        // Non-blocking: app still works without history.
      }
    }

    loadHistory();
  }, []);

  const activeId = result?.id;

  const subHeading = useMemo(() => {
    if (level === 'Explain like 5') return 'Tiny words. Big clarity.';
    if (level === 'Explain like 12') return 'Smart, simple, and relatable.';
    return 'Full context with clear structure.';
  }, [level]);

  async function handleExplain(event, options = { makeDifferent: false }) {
    if (event) event.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await requestExplanation({
        topic: topic.trim(),
        level,
        makeDifferent: options.makeDifferent,
      });

      setResult(response.explanation);
      setHistory((prev) => [response.explanation, ...prev.filter((item) => item.id !== response.explanation.id)].slice(0, 30));

      window.requestAnimationFrame(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (apiError) {
      setError(apiError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleHistorySelect(item) {
    setResult(item);
    setTopic(item.topic);
    setLevel(item.level);
    window.requestAnimationFrame(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  async function handleCopy() {
    if (!result) return;

    const copyText = [
      `Title: ${result.title}`,
      '',
      `Explanation: ${result.explanation}`,
      '',
      'Examples:',
      ...result.examples.map((item) => `- ${item}`),
      '',
      'Key Points:',
      ...result.keyPoints.map((item) => `- ${item}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      setError('Copy failed in this browser context.');
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/30" />
        <div className="absolute right-10 top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/20" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <HistorySidebar items={history} onSelect={handleHistorySelect} activeId={activeId} />

        <main className="mx-auto w-full max-w-4xl">
          <div className="mb-12 flex items-center justify-end">
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
            />
          </div>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Explain Like I&apos;m 5 AI</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Explain anything simply
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">{subHeading}</p>
          </motion.section>

          <ExplainForm
            topic={topic}
            level={level}
            loading={loading}
            onTopicChange={setTopic}
            onLevelChange={setLevel}
            onSubmit={handleExplain}
          />

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 rounded-2xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur-lg dark:border-slate-700 dark:bg-slate-900/60"
              >
                <LoadingSpinner />
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
              {error}
            </div>
          )}

          <div ref={outputRef} className="mt-8">
            <OutputCard
              data={result}
              loading={loading}
              onRegenerate={() => handleExplain(null, { makeDifferent: true })}
              onCopy={handleCopy}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
