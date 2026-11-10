import { EVENT_DETAILS } from '../data/content';

/**
 * Calculates the exact UTC millisecond epoch for an event in an IANA timezone
 * using the native browser Intl.DateTimeFormat API to dynamically account
 * for daylight saving time (America/Chicago Central Time).
 */
export function getTargetEpochMs(
  year: number = EVENT_DETAILS.year,
  month: number = EVENT_DETAILS.month,
  day: number = EVENT_DETAILS.day,
  hour: number = EVENT_DETAILS.hour,
  minute: number = EVENT_DETAILS.minute,
  second: number = EVENT_DETAILS.second,
  timeZone: string = EVENT_DETAILS.timeZone
): number {
  // Construct an initial estimate in UTC
  const targetUtcEstimate = Date.UTC(year, month - 1, day, hour, minute, second);

  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  // Iteratively converge on the exact epoch where formatting in `timeZone` matches target components
  let guess = targetUtcEstimate;
  for (let i = 0; i < 3; i++) {
    const parts = dtf.formatToParts(new Date(guess));
    const p: Record<string, number> = {};
    for (const part of parts) {
      if (part.type !== 'literal') {
        p[part.type] = parseInt(part.value, 10);
      }
    }
    const currentHour = p.hour === 24 ? 0 : p.hour;
    const guessAsTargetTz = Date.UTC(p.year, p.month - 1, p.day, currentHour, p.minute, p.second);
    const diff = targetUtcEstimate - guessAsTargetTz;
    if (diff === 0) break;
    guess += diff;
  }
  return guess;
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEventStarted: boolean;
  totalRemainingMs: number;
}

export function calculateCountdown(targetMs: number, nowMs: number = Date.now()): CountdownState {
  const difference = targetMs - nowMs;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventStarted: true,
      totalRemainingMs: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isEventStarted: false,
    totalRemainingMs: difference,
  };
}
