import { NgeDate } from './ngeDate';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NgeDatePickerService {
    getDayViewData(year, month): NgeDate[] {
        const days = this.getDaysInMonth(year, month);
        const firstDay = (new Date(year, month , 1)).getDay();
        const prevMonthDays = this.getPreviousMonthDays(year, month).slice(-firstDay);
        const currentMonthDays = this.getCurrentMonthDays(year, month);
        const nextMonthDays = this.getNextMonthDays(year, month)
        nextMonthDays.length = (35 - prevMonthDays.length - currentMonthDays.length);
        const viewData = prevMonthDays.concat(currentMonthDays).concat(nextMonthDays);
        return viewData;

    }
    getDaysInMonth(year, month): number {
        return new Date(year, month + 1, 0).getDate();
    }

    getYearMonth(date: Date): any {
        return {
            year: date.getFullYear(),
            month: date.getMonth()
        };
    }
    getPreviousMonthDays(year, month): NgeDate[] {
        if (month === 0) {
            year--;
            month = 11;
        } else {
            month--;
        }
        return this.getCurrentMonthDays(year, month);
    }
    getNextMonthDays(year, month): NgeDate[] {
        if (month === 11) {
            year++;
            month = 0;
        } else {
            month++;
        }
        return this.getCurrentMonthDays(year, month);
    }
    getCurrentMonthDays(year, month) {
        const days = this.getDaysInMonth(year, month);
        const list =  [] as  NgeDate[];
        for (let i = 1; i <= days; i++) {
            list.push({year, month, day: i} as NgeDate);
        }
        return list;
    }

}
