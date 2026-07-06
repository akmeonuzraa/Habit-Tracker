export function getDaysInMonth(year: number, month: number) {
  const numDays = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 1; i <= numDays; i++) {
    const date = new Date(year, month, i);
    const yearStr = year.toString();
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = i.toString().padStart(2, '0');
    const dateString = `${yearStr}-${monthStr}-${dayStr}`;

    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Mon"
    days.push({
      dayNum: i,
      dateString,
      weekday,
      dateObj: date,
    });
  }
  return days;
}

export function getLocalDateString(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeekOfMonth(dayNum: number, year: number, month: number): number {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0: Sun, 1: Mon, etc.
  // We can group standard calendar weeks (starting on Sunday)
  return Math.ceil((dayNum + firstDayWeekday) / 7);
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
