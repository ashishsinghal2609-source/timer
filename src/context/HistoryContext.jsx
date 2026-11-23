"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('timerHistory');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('timerHistory', JSON.stringify(history));
    } catch {}
  }, [history]);

  const addRecord = (record) => {
    setHistory((prev) => [record, ...prev]);
  };

  return <HistoryContext.Provider value={{ history, addRecord }}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}

export default HistoryContext;
