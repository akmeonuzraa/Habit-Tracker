export interface Habit {
  id: string;
  name: string;
  icon: string; // Emoji or short symbol
  createdAt: string; // ISO timestamp
  // history holds check-in states where key is "YYYY-MM-DD" and value is boolean
  history: Record<string, boolean>;
}

export interface DayProgress {
  dateString: string; // YYYY-MM-DD
  dayNum: number;
  weekday: string;
  isToday: boolean;
  completionRate: number; // 0 to 100
}

export type SaveStatus = 'saving' | 'saved' | 'error';
