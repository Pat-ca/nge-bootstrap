
import { NgeDate, NgeYearMonth } from './ngeDate';

export interface NgeDayView {
    days: Array<NgeDate[]>;
    month: NgeYearMonth;
    weekDayNames: string[];
}
export interface NgeMonthView {
    months: Array<NgeYearMonth[]>;
    year: number;
    monthNames: string[];
}
