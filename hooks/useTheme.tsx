import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem('geo-journey-theme') as Theme | null;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (storedTheme) return storedTheme;
      if (userMedia.matches) return 'dark';
    } catch {
      // ignore and fall back
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('geo-journey-theme', theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // ✅ Use JSX now (file must be .tsx)
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
