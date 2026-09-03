import { useEffect, useState } from 'react';

function TypingText({ text, speed = 8, triggerKey }) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    setVisibleText('');

    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed, triggerKey]);

  return <p className="leading-7 text-slate-700 dark:text-slate-200">{visibleText}</p>;
}

export default TypingText;
