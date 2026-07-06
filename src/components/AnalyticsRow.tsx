import { Habit } from '../types';

interface AnalyticsRowProps {
  habits: Habit[];
  days: { dayNum: number; dateString: string; weekday: string }[];
}

export default function AnalyticsRow({ habits, days }: AnalyticsRowProps) {
  // 1. Daily Progress calculations
  const totalHabits = habits.length;
  const dailyData = days.map((day) => {
    const checkedCount = habits.filter((h) => h.history[day.dateString]).length;
    const rate = totalHabits > 0 ? Math.round((checkedCount / totalHabits) * 100) : 0;
    return {
      dayNum: day.dayNum,
      checkedCount,
      rate,
    };
  });

  // 2. Overall Completion calculations
  const totalDays = days.length;
  const totalPossibleCheckins = totalHabits * totalDays;
  let totalCompletedCheckins = 0;
  habits.forEach((habit) => {
    days.forEach((day) => {
      if (habit.history[day.dateString]) {
        totalCompletedCheckins += 1;
      }
    });
  });

  const overallPercentage =
    totalPossibleCheckins > 0 ? Math.round((totalCompletedCheckins / totalPossibleCheckins) * 100) : 0;
  const leftCheckins = totalPossibleCheckins - totalCompletedCheckins;

  // Donut SVG Math: Radius = 36, Circumference = 2 * PI * r ≈ 226.2
  const donutRadius = 36;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const donutStrokeOffset = donutCircumference - (overallPercentage / 100) * donutCircumference;

  // 3. Top Habits calculations
  const habitsWithStats = habits.map((habit) => {
    const completed = days.filter((d) => habit.history[d.dateString]).length;
    const percentage = totalDays > 0 ? Math.round((completed / totalDays) * 100) : 0;
    return {
      ...habit,
      completed,
      percentage,
    };
  });

  // Sort by percentage descending, then by name
  const rankedHabits = [...habitsWithStats].sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {/* Panel 1: Daily Progress */}
      <div className="border border-mono-border rounded-[14px] bg-mono-surface p-6 flex flex-col justify-between h-[300px]">
        <div>
          <h4 className="text-[11px] font-mono font-bold text-mono-secondary uppercase tracking-[0.12em] mb-1">
            Daily Progress
          </h4>
          <p className="text-xs text-mono-faint">
            Percentage of active habits completed per day
          </p>
        </div>

        {totalHabits === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <span className="text-xs font-mono text-mono-faint">No habits to track</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-end mt-4">
            {/* The Bar Chart Container */}
            <div className="flex items-end justify-between h-36 gap-1 px-1">
              {dailyData.map((data) => {
                const fillHeight = `${Math.max(data.rate, 2)}%`;
                const isActive = data.rate > 0;
                return (
                  <div
                    key={`daily-bar-${data.dayNum}`}
                    className="flex-1 group relative flex flex-col items-center"
                  >
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                      <div className="bg-white text-black font-mono text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap shadow-md">
                        Day {data.dayNum}: {data.checkedCount}/{totalHabits} ({data.rate}%)
                      </div>
                      <div className="w-1.5 h-1.5 bg-white rotate-45 -mt-1" />
                    </div>

                    {/* Bar track & fill */}
                    <div className="w-full h-32 flex items-end overflow-hidden">
                      <div
                        style={{ height: fillHeight }}
                        className={`w-full rounded-[2px] transition-all duration-300 ${
                          isActive ? 'bg-white' : 'bg-mono-faint'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-Axis labels (Days 1, 10, 20, 31, etc.) */}
            <div className="flex justify-between text-[9px] font-mono text-mono-faint mt-2 px-1 border-t border-mono-border/40 pt-1 select-none">
              <span>Day 1</span>
              <span>Day {Math.ceil(days.length / 2)}</span>
              <span>Day {days.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* Panel 2: Overall Completion */}
      <div className="border border-mono-border rounded-[14px] bg-mono-surface p-6 flex flex-col justify-between h-[300px]">
        <div>
          <h4 className="text-[11px] font-mono font-bold text-mono-secondary uppercase tracking-[0.12em] mb-1">
            Overall Completion
          </h4>
          <p className="text-xs text-mono-faint">
            Total monthly completion volume
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-2">
          {totalPossibleCheckins === 0 ? (
            <span className="text-xs font-mono text-mono-faint">No targets available</span>
          ) : (
            <div className="flex items-center gap-6 w-full px-2">
              {/* Conic Gradient Donut ring */}
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                style={{
                  background: `conic-gradient(var(--color-mono-accent) ${overallPercentage}%, var(--color-mono-elevated) 0)`,
                }}
              >
                {/* Inner cutout mask */}
                <div className="absolute w-[60px] h-[60px] bg-mono-surface rounded-full flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-white relative z-10 leading-none">
                    {overallPercentage}%
                  </span>
                </div>
              </div>

              {/* Check-ins metadata */}
              <div className="flex flex-col justify-center min-w-0">
                <div className="text-3xl font-display font-black text-white leading-tight">
                  {totalCompletedCheckins}
                </div>
                <div className="text-[10px] font-mono uppercase text-mono-secondary tracking-wider">
                  Total Check-ins
                </div>
                <div className="text-[10px] font-mono text-mono-faint mt-0.5">
                  {leftCheckins} remaining
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panel 3: Top Habits */}
      <div className="border border-mono-border rounded-[14px] bg-mono-surface p-6 flex flex-col justify-between h-[300px]">
        <div>
          <h4 className="text-[11px] font-mono font-bold text-mono-secondary uppercase tracking-[0.12em] mb-1">
            Top Habits
          </h4>
          <p className="text-xs text-mono-faint">
            Habits sorted by completion rate
          </p>
        </div>

        {habits.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center">
            <span className="text-xs font-mono text-mono-faint">No habits to rank</span>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar mt-4 pr-1 space-y-4">
            {rankedHabits.map((habit, index) => (
              <div key={`leaderboard-${habit.id}`} className="flex flex-col gap-1.5 text-sm">
                <div className="flex items-center justify-between font-sans text-xs font-medium">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-mono-faint w-4 shrink-0 font-mono text-[10px]">
                      {index + 1}.
                    </span>
                    <span className="shrink-0 text-xs">{habit.icon}</span>
                    <span className="text-mono-primary truncate font-semibold">
                      {habit.name}
                    </span>
                  </div>
                  <span className="font-mono text-mono-secondary shrink-0">
                    {habit.percentage}%
                  </span>
                </div>

                {/* Progress bar tracks */}
                <div className="w-full h-1 bg-mono-elevated rounded-full overflow-hidden">
                  <div
                    style={{ width: `${habit.percentage}%` }}
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
