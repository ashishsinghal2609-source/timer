"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button.jsx';
import { useHistory } from '../context/HistoryContext.jsx';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function Timer() {
  const [inputMinutes, setInputMinutes] = useState('5');
  const [timeLeft, setTimeLeft] = useState(300); // default 5 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const { addRecord } = useHistory();

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsPaused(false);
            addRecord({
              id: Date.now(),
              duration: Number(inputMinutes) * 60,
              completedAt: new Date().toISOString(),
            });
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, addRecord, inputMinutes]);

  const handleStart = () => {
    const mins = Number(inputMinutes);
    if (isNaN(mins) || mins <= 0 || mins > 1440) return;
    setTimeLeft(mins * 60);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(Number(inputMinutes) * 60);
  };

  return (
    <section className="max-w-md mx-auto bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 rounded-3xl p-8 shadow-lg shadow-black/50">
      <h2 className="font-display text-4xl font-bold mb-6 tracking-tight text-pink-300">Timer</h2>
      <label htmlFor="minutes" className="block text-sm font-semibold uppercase tracking-widest mb-2 text-pink-200">
        Set Timer (minutes)
      </label>
      <input
        id="minutes"
        type="number"
        min="1"
        max="1440"
        step="1"
        value={inputMinutes}
        onChange={(e) => setInputMinutes(e.target.value)}
        disabled={isRunning && !isPaused}
        className="w-full rounded-md px-4 py-3 text-lg font-semibold text-indigo-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
        aria-label="Set timer in minutes"
      />

      <div className="mt-8 text-center">
        <p className="text-7xl font-mono font-extrabold tracking-wide text-pink-400 select-text" aria-live="polite">
          {formatTime(timeLeft)}
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {!isRunning && (
          <Button onClick={handleStart} aria-label="Start timer">
            Start
          </Button>
        )}
        {isRunning && !isPaused && (
          <Button variant="secondary" onClick={handlePause} aria-label="Pause timer">
            Pause
          </Button>
        )}
        {isRunning && isPaused && (
          <Button onClick={handleResume} aria-label="Resume timer">
            Resume
          </Button>
        )}
        {isRunning && (
          <Button variant="danger" onClick={handleReset} aria-label="Reset timer">
            Reset
          </Button>
        )}
      </div>
    </section>
  );
}

export default Timer;
