import { useState, useEffect } from 'react';
import { Expense } from '../types';
import { demoExpenses } from '../utils/demoData';

const STORAGE_KEY = 'geo-journey-expenses';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoExpenses));
      return demoExpenses;
    } catch {
      return demoExpenses;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => setExpenses(prev => [expense, ...prev]);
  const clearExpenses = () => {
    setExpenses([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { expenses, addExpense, clearExpenses };
};
