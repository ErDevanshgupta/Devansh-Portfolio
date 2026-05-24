'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

const CYCLE = ['dark', 'light', 'midnight'];

function applyTheme(t) {
  const root = document.documentElement;
  root.classList.remove('dark', 'midnight');
  if (t === 'dark')     root.classList.add('dark');
  if (t === 'midnight') root.classList.add('dark', 'midnight');
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    setTheme(prev => {
      const next = CYCLE[(CYCLE.indexOf(prev) + 1) % CYCLE.length];
      localStorage.setItem('theme', next);
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
