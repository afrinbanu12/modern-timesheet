export type DayStatus = 'present' | 'absent' | 'leave' | 'weekend' | 'empty';

export interface DayData {
  date: number;
  dayOfWeek: number;
  status: DayStatus;
  hours?: number;
  notes?: string;
}

export interface MonthData {
  year: number;
  month: number;
  days: DayData[];
}
