"use client";

import React from 'react';
import { useHistory } from '../context/HistoryContext.jsx';
import { Clock, Trash2 } from 'lucide-react';
import { Button } from './ui/Button.jsx';

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function History() {
  const { history, addRecord } = useHistory();

  const handleClear = () => {
    if (window.confirm('Clear all history? This action cannot be undone.')) {
      localStorage.removeItem('timerHistory');
      window.location.reload();
    }
  };

  if (!history.length) {
    return (
      <section className="max-w-4xl mx-auto bg-indigo-900 rounded-3xl p-8 shadow-lg shadow-black/50 text-center">
        <Clock className="mx-auto mb-4 w-12 h-12 text-pink-400" />
        <p className="text-lg text-pink-300 font-semibold">No timer history yet.</p>
        <p className="mt-2 text-gray-400">Start a timer to see your completed sessions here.</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto bg-indigo-900 rounded-3xl p-8 shadow-lg shadow-black/50">
      <header className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-pink-300">History</h2>
        <Button variant="danger" onClick={handleClear} aria-label="Clear history">
          <Trash2 className="w-5 h-5 mr-2" /> Clear All
        </Button>
      </header>
      <ul className="divide-y divide-purple-700 max-h-96 overflow-y-auto">
        {history.map(({ id, duration, completedAt }) => (
          <li key={id} className="flex justify-between py-3">
            <span className="font-mono text-pink-400">{formatDuration(duration)}</span>
            <time className="text-gray-400" dateTime={completedAt} title={new Date(completedAt).toString()}>
              {formatDate(completedAt)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default History;
