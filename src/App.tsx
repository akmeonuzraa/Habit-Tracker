import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TrackerGrid from './components/TrackerGrid';
import AnalyticsRow from './components/AnalyticsRow';
import EmptyState from './components/EmptyState';
import { Habit, SaveStatus } from './types';
import { getDaysInMonth } from './utils/dateUtils';

const DEFAULT_HABITS: Habit[] = [
  {
    id: 'h-1',
    name: 'Read 30 mins',
    icon: '📖',
    createdAt: new Date().toISOString(),
    history: {},
  },
  {
    id: 'h-2',
    name: 'Exercise & Gym',
    icon: '💪',
    createdAt: new Date().toISOString(),
    history: {},
  },
  {
    id: 'h-3',
    name: 'Hydrate (8+ cups)',
    icon: '💧',
    createdAt: new Date().toISOString(),
    history: {},
  },
  {
    id: 'h-4',
    name: 'Meditate 10 mins',
    icon: '🧘',
    createdAt: new Date().toISOString(),
    history: {},
  },
  {
    id: 'h-5',
    name: 'Write clean code',
    icon: '💻',
    createdAt: new Date().toISOString(),
    history: {},
  },
];

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize selected month & year with current local date
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load habits from local storage once on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('my_habits_tracker_data');
      if (savedData) {
        setHabits(JSON.parse(savedData));
      } else {
        // Leave empty initially so empty state is displayed, inviting custom addition or quick seeding
        setHabits([]);
      }
    } catch (e) {
      console.error('Failed to load habits from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persistent save handler
  const triggerSave = (updatedHabits: Habit[]) => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    try {
      localStorage.setItem('my_habits_tracker_data', JSON.stringify(updatedHabits));
      // Simulate brief, elegant saving status update to visually reassure the user
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus('saved');
      }, 600);
    } catch (e) {
      console.error('Failed to save to localStorage', e);
      setSaveStatus('error');
    }
  };

  // Actions
  const handleToggleCheck = (habitId: string, dateString: string) => {
    const updated = habits.map((habit) => {
      if (habit.id === habitId) {
        const nextHistory = { ...habit.history };
        if (nextHistory[dateString]) {
          delete nextHistory[dateString];
        } else {
          nextHistory[dateString] = true;
        }
        return { ...habit, history: nextHistory };
      }
      return habit;
    });
    setHabits(updated);
    triggerSave(updated);
  };

  const handleAddHabit = (name: string, icon: string) => {
    const newHabit: Habit = {
      id: `h-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      icon,
      createdAt: new Date().toISOString(),
      history: {},
    };
    const updated = [newHabit, ...habits];
    setHabits(updated);
    triggerSave(updated);
  };

  const handleDeleteHabit = (habitId: string) => {
    const updated = habits.filter((habit) => habit.id !== habitId);
    setHabits(updated);
    triggerSave(updated);
  };

  const handleAddDefaultHabits = () => {
    setHabits(DEFAULT_HABITS);
    triggerSave(DEFAULT_HABITS);
  };

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Generate calendar days
  const days = getDaysInMonth(currentYear, currentMonth);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-mono-bg text-mono-primary flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-xs text-mono-secondary tracking-widest">LOADING CORE ENGINE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mono-bg text-mono-primary flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 selection:bg-white selection:text-black">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        
        {/* Header Block */}
        <Header
          currentYear={currentYear}
          currentMonth={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onAddHabit={handleAddHabit}
          saveStatus={saveStatus}
        />

        {/* Content Block */}
        {habits.length === 0 ? (
          <EmptyState onAddDefaultHabits={handleAddDefaultHabits} />
        ) : (
          <>
            {/* Interactive Grid */}
            <TrackerGrid
              habits={habits}
              days={days}
              currentYear={currentYear}
              currentMonth={currentMonth}
              onToggleCheck={handleToggleCheck}
              onDeleteHabit={handleDeleteHabit}
            />

            {/* Dashboard Analytics Panel */}
            <AnalyticsRow habits={habits} days={days} />
          </>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-mono-border flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-mono-faint gap-3 select-none tracking-widest uppercase">
          <span>&copy; {new Date().getFullYear()} MY HABITS. STRICT MONOCHROME CORE.</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Local Sync Active: Saved</span>
            </div>
            <span>PERSISTENCE: LOCAL_STORAGE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
