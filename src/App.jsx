import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Timer from './components/Timer.jsx';
import History from './components/History.jsx';
import { HistoryProvider } from './context/HistoryContext.jsx';
import { Clock } from 'lucide-react';

export function App() {
  return (
    <HistoryProvider>
      <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-gray-100 font-sans">
        <header className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4 border-b border-purple-700">
          <Clock className="w-8 h-8 text-pink-400" />
          <h1 className="font-display text-3xl font-bold tracking-wide">Timer App</h1>
          <nav className="ml-auto flex gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-lg font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-pink-400 underline underline-offset-4 decoration-2' : 'text-gray-300 hover:text-pink-400'
                }`
              }
            >
              Timer
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `text-lg font-semibold uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? 'text-pink-400 underline underline-offset-4 decoration-2' : 'text-gray-300 hover:text-pink-400'
                }`
              }
            >
              History
            </NavLink>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <footer className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          &copy; 2026 Timer App. Crafted with care.
        </footer>
      </div>
    </HistoryProvider>
  );
}

export default App;
