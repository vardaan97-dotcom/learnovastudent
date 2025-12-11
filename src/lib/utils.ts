import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// SCORM-compliant time formatting
export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function parseTimeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parts[0] * 60 + parts[1];
}

// Calculate completion percentage
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// SCORM status mapping
export type SCORMStatus = 'not attempted' | 'incomplete' | 'completed' | 'passed' | 'failed';

export function getSCORMStatus(progress: number, score?: number, passingScore?: number): SCORMStatus {
  if (progress === 0) return 'not attempted';
  if (progress < 100) return 'incomplete';
  if (score !== undefined && passingScore !== undefined) {
    return score >= passingScore ? 'passed' : 'failed';
  }
  return 'completed';
}
