import { useState, FormEvent } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { MONTH_NAMES } from '../utils/dateUtils';
import { SaveStatus } from '../types';
import SaveIndicator from './SaveIndicator';

interface HeaderProps {
  currentYear: number;
  currentMonth: number; // 0-indexed
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddHabit: (name: string, icon: string) => void;
  saveStatus: SaveStatus;
}

const POPULAR_EMOJIS = ['⚡', '💪', '💧', '📖', '🧘', '💻', '☀️', '🍎'];

export default function Header({
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onAddHabit,
  saveStatus,
}: HeaderProps) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a habit name');
      return;
    }
    // Default to a bullet point or lightning bolt if no icon is specified
    const finalIcon = icon.trim() || '✦';
    onAddHabit(name.trim(), finalIcon);
    setName('');
    setIcon('');
    setError('');
  };

  return (
    <header className="flex flex-col gap-6 pb-6 border-b border-mono-border">
      {/* Top row: Title + Month selector & Save Status */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="title-group">
          <h1 className="font-display text-4xl sm:text-[42px] font-extrabold tracking-[-0.04em] uppercase text-mono-primary leading-none">
            My Habits
          </h1>
          
          <div className="flex items-center gap-2 mt-1 select-none">
            <p className="text-xs sm:text-sm font-sans text-mono-secondary font-medium tracking-[0.1em] uppercase">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </p>
            <div className="flex items-center gap-0.5 ml-2">
              <button
                onClick={onPrevMonth}
                aria-label="Previous Month"
                className="p-1 rounded hover:bg-mono-surface border border-transparent hover:border-mono-border text-mono-secondary hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNextMonth}
                aria-label="Next Month"
                className="p-1 rounded hover:bg-mono-surface border border-transparent hover:border-mono-border text-mono-secondary hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-time persistence status indicator */}
        <div className="self-start md:self-end">
          <SaveIndicator status={saveStatus} />
        </div>
      </div>

      {/* Inline Form to Add Habit */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          {/* Habit Name input */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="habit-name" className="text-xs font-mono text-mono-secondary uppercase tracking-wider">
              Habit Name
            </label>
            <input
              id="habit-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value) setError('');
              }}
              placeholder="e.g. Read for 30 mins, Gym workout"
              className="w-full bg-mono-surface border border-mono-border hover:border-mono-border-hover rounded-[10px] px-4 py-2.5 text-xs sm:text-sm text-mono-primary placeholder:text-mono-faint focus:border-white focus:ring-1 focus:ring-white transition-all"
            />
          </div>

          {/* Icon/Emoji input */}
          <div className="w-full lg:w-48 flex flex-col gap-1.5">
            <label htmlFor="habit-icon" className="text-xs font-mono text-mono-secondary uppercase tracking-wider">
              Emoji / Icon <span className="text-mono-faint font-normal">(Optional)</span>
            </label>
            <input
              id="habit-icon"
              type="text"
              maxLength={4}
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="✦"
              className="w-full bg-mono-surface border border-mono-border hover:border-mono-border-hover rounded-[10px] px-4 py-2.5 text-xs sm:text-sm text-center text-mono-primary placeholder:text-mono-faint focus:border-white focus:ring-1 focus:ring-white transition-all font-mono"
            />
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="w-full lg:w-auto bg-white text-black font-bold text-xs sm:text-sm hover:bg-mono-primary active:scale-98 transition-all px-6 py-2.5 rounded-[10px] flex items-center justify-center gap-1.5 cursor-pointer h-[42px]"
          >
            <Plus className="w-4 h-4" />
            Add habit
          </button>
        </div>

        {/* Quick Emoji Toggles for easy addition */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-mono-faint">Suggestions:</span>
          {POPULAR_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setIcon(emoji)}
              className={`text-sm px-2.5 py-1 rounded border hover:border-mono-primary hover:bg-mono-surface transition-all cursor-pointer ${
                icon === emoji ? 'border-white bg-mono-surface' : 'border-mono-border bg-transparent'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-xs font-mono text-white bg-mono-surface border border-mono-border px-3 py-1.5 rounded-md mt-1 self-start">
            {error}
          </p>
        )}
      </form>
    </header>
  );
}
