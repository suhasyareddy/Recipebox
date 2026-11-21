/**
 * Date and Time utilities for RecipeBox
 * Handles local date formatting, avoiding UTC-shift bugs on date-only inputs,
 * and provides dynamic week calculation for meal planning.
 */

/**
 * Format a date string, Date object, or timestamp to user's local readable date.
 * If given a date-only string (e.g. "YYYY-MM-DD"), parses parts directly to prevent
 * timezone conversion from shifting the day backwards/forwards.
 */
export function formatLocalDate(
  dateInput?: string | Date | number | null,
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  if (!dateInput) return "";

  try {
    let date: Date;

    if (typeof dateInput === "string") {
      // Check for YYYY-MM-DD date-only format
      const dateOnlyMatch = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (dateOnlyMatch) {
        const year = parseInt(dateOnlyMatch[1], 10);
        const month = parseInt(dateOnlyMatch[2], 10) - 1;
        const day = parseInt(dateOnlyMatch[3], 10);
        date = new Date(year, month, day);
      } else {
        date = new Date(dateInput);
      }
    } else {
      date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(undefined, options).format(date);
  } catch (err) {
    console.warn("Date formatting error:", err);
    return "";
  }
}

/**
 * Formats today's date for display in the Home Header Banner
 * e.g., "Saturday, 21 November 2026"
 */
export function getTodayBannerDisplay(): string {
  const now = new Date();
  return formatLocalDate(now, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export interface WeekDayInfo {
  day: string;
  date: string;
  fullDate: Date;
  isToday: boolean;
  dateKey: string; // YYYY-MM-DD
}

/**
 * Computes dynamic week dates based on weekOffset (0 = current week, 1 = next week, -1 = prev week)
 * Starts on Monday and ends on Sunday in user's local timezone.
 */
export function getWeekScheduleRange(offsetWeeks: number = 0): {
  weekLabel: string;
  days: WeekDayInfo[];
} {
  const now = new Date();
  // Midnight today in local timezone
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Day of week: 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const dayOfWeek = today.getDay();
  // Distance to Monday (0 if Monday, 1 if Tuesday ... 6 if Sunday)
  const distanceToMonday = (dayOfWeek + 6) % 7;

  const monday = new Date(today);
  monday.setDate(today.getDate() - distanceToMonday + offsetWeeks * 7);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const days: WeekDayInfo[] = dayNames.map((name, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);

    const isToday =
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();

    const monthStr = d.toLocaleDateString(undefined, { month: "short" });
    const dayNum = d.getDate();
    const dateFormatted = `${monthStr} ${dayNum}`;

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dayPadded = String(d.getDate()).padStart(2, "0");
    const dateKey = `${y}-${m}-${dayPadded}`;

    return {
      day: name,
      date: dateFormatted,
      fullDate: d,
      isToday,
      dateKey,
    };
  });

  const sunday = days[6].fullDate;
  const startStr = monday.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const endStr = sunday.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return {
    weekLabel: `Week of ${startStr} – ${endStr}`,
    days,
  };
}
