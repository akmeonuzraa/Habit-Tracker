import { useState } from 'react';
import { Check, Trash2, X, AlertTriangle } from 'lucide-react';
import { Habit, DayProgress } from '../types';
import { getWeekOfMonth, getLocalDateString } from '../utils/dateUtils';

interface TrackerGridProps {
  habits: Habit[];
  days: { dayNum: number; dateString: string; weekday: string }[];
  currentYear: number;
  currentMonth: number;
  onToggleCheck: (habitId: string, dateString: string) => void;
  onDeleteHabit: (habitId: string) => void;
}

export default function TrackerGrid({
  habits,
  days,
  currentYear,
  currentMonth,
  onToggleCheck,
  onDeleteHabit,
}: TrackerGridProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const todayStr = getLocalDateString();

  // Group days into weeks for the header labels
  const weekGroups: { weekNum: number; count: number }[] = [];
  days.forEach((day) => {
    const weekNum = getWeekOfMonth(day.dayNum, currentYear, currentMonth);
    const existingGroup = weekGroups.find((g) => g.weekNum === weekNum);
    if (existingGroup) {
      existingGroup.count += 1;
    } else {
      weekGroups.push({ weekNum, count: 1 });
    }
  });

  // Calculate completion percentage for a habit in the active month
  const getHabitCompletion = (habit: Habit) => {
    if (days.length === 0) return 0;
    const checkedCount = days.filter((d) => habit.history[d.dateString]).length;
    return Math.round((checkedCount / days.length) * 100);
  };

  return (
    <div className="w-full border border-mono-border rounded-[14px] bg-mono-surface overflow-hidden my-6">
      {/* Scrollable Container */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse text-left table-fixed">
          {/* Header */}
          <thead>
            {/* Row 1: Week Blocks */}
            <tr className="border-b border-mono-border bg-mono-elevated">
              <th className="w-60 sm:w-72 p-4 sticky left-0 z-20 bg-mono-elevated border-r border-mono-border font-display text-[11px] text-mono-faint uppercase tracking-[0.1em]">
                Habit
              </th>
              {weekGroups.map((group) => (
                <th
                  key={`week-${group.weekNum}`}
                  colSpan={group.count}
                  className="p-1.5 text-center font-mono text-[10px] text-mono-faint uppercase tracking-widest border-r border-mono-border last:border-r-0 border-b border-mono-border/40 select-none bg-mono-elevated/70"
                >
                  Week {group.weekNum}
                </th>
              ))}
            </tr>

            {/* Row 2: Day Info (Date & Weekday) */}
            <tr className="border-b border-mono-border bg-mono-surface/30 select-none">
              <th className="p-4 sticky left-0 z-20 bg-mono-surface border-r border-mono-border text-[11px] font-mono text-mono-secondary uppercase tracking-[0.05em]">
                Completion Track
              </th>
              {days.map((day, idx) => {
                const isToday = day.dateString === todayStr;
                const weekNum = getWeekOfMonth(day.dayNum, currentYear, currentMonth);
                // Draw a boundary border at the end of each week
                const isEndOfWeek =
                  idx < days.length - 1 &&
                  getWeekOfMonth(days[idx + 1].dayNum, currentYear, currentMonth) !== weekNum;

                return (
                  <th
                    key={day.dateString}
                    className={`w-10 sm:w-12 p-2 text-center font-sans text-[10px] transition-colors duration-150 relative ${
                      isToday ? 'bg-white/[0.04] text-white font-bold' : 'text-mono-secondary'
                    } ${isEndOfWeek ? 'border-r border-mono-border/80' : 'border-r border-mono-border/30 last:border-r-0'}`}
                  >
                    {/* Subtly show today helper */}
                    {isToday && (
                      <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                    <div className="text-[9px] font-medium uppercase opacity-80">
                      {day.weekday.slice(0, 1)}
                    </div>
                    <div className={`text-xs mt-0.5 ${isToday ? 'text-white font-bold' : 'text-mono-faint'}`}>
                      {day.dayNum.toString().padStart(2, '0')}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-mono-border">
            {habits.map((habit) => {
              const completion = getHabitCompletion(habit);
              const isConfirmingDelete = confirmDeleteId === habit.id;

              return (
                <tr
                  key={habit.id}
                  className="group hover:bg-white/[0.02] transition-colors duration-150"
                >
                  {/* Sticky First Column */}
                  <td className="p-4 sticky left-0 z-10 bg-mono-surface border-r border-mono-border shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
                    {isConfirmingDelete ? (
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-white">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono">Delete?</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              onDeleteHabit(habit.id);
                              setConfirmDeleteId(null);
                            }}
                            className="text-[10px] bg-white text-black px-2 py-1 rounded font-mono font-bold hover:bg-mono-secondary active:scale-95 transition-all cursor-pointer"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-1 rounded text-mono-secondary hover:text-white hover:bg-mono-elevated border border-mono-border transition-all cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between group/cell">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="text-sm shrink-0 w-6 h-6 flex items-center justify-center bg-mono-elevated border border-mono-border rounded-md select-none"
                            role="img"
                            aria-label="Habit Icon"
                          >
                            {habit.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-sans font-semibold text-mono-primary truncate group-hover:text-white transition-colors">
                              {habit.name}
                            </p>
                            <span className="font-mono text-[11px] text-mono-faint">
                              {completion}%
                            </span>
                          </div>
                        </div>

                        {/* Inline Delete Button, shown on hover */}
                        <button
                          onClick={() => setConfirmDeleteId(habit.id)}
                          className="opacity-0 group-hover/cell:opacity-100 p-1.5 rounded text-mono-faint hover:text-white hover:bg-mono-elevated transition-all cursor-pointer"
                          aria-label={`Delete ${habit.name}`}
                          title="Delete Habit"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Day Cells */}
                  {days.map((day, idx) => {
                    const isChecked = !!habit.history[day.dateString];
                    const isToday = day.dateString === todayStr;
                    const weekNum = getWeekOfMonth(day.dayNum, currentYear, currentMonth);
                    const isEndOfWeek =
                      idx < days.length - 1 &&
                      getWeekOfMonth(days[idx + 1].dayNum, currentYear, currentMonth) !== weekNum;

                    return (
                      <td
                        key={day.dateString}
                        className={`p-2 text-center transition-colors duration-150 relative ${
                          isToday ? 'bg-white/[0.02]' : ''
                        } ${isEndOfWeek ? 'border-r border-mono-border/80' : 'border-r border-mono-border/30 last:border-r-0'}`}
                      >
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => onToggleCheck(habit.id, day.dateString)}
                            aria-label={`Toggle check-in for ${habit.name} on ${day.weekday} ${day.dayNum}`}
                            className={`w-[22px] h-[22px] flex items-center justify-center rounded-[4px] border transition-all duration-150 active:scale-90 cursor-pointer ${
                              isChecked
                                ? 'bg-white border-white text-black'
                                : 'border-mono-border hover:border-mono-border-hover bg-mono-surface'
                            }`}
                          >
                            {isChecked && <span className="text-[10px] font-bold select-none leading-none">✓</span>}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
