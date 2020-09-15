import { NgeDate } from 'dist/nge-bootstrap/lib/datepicker/ngeDate';
import { NgeYearMonth } from './ngeDate';

export interface NgeDayView {
    days: Array<NgeDate[]>;
    month: NgeYearMonth;
    weekDayNames: string[];
}
