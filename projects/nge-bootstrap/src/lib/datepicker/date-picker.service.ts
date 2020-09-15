import { NgeDate, NgeYearMonth } from './ngeDate';
import { Injectable } from '@angular/core';
import { NgeDayView, NgeMonthView } from './view';
import { NgeDatepickerI18n } from './datepicker-i18n';

@Injectable({providedIn: 'root'})
export class NgeDatePickerService {
    constructor(private i18n: NgeDatepickerI18n){}
    getDayViewData(yearMonth: NgeYearMonth): NgeDayView {
        const dayView = {} as NgeDayView;
        const firstDay = (new Date(yearMonth.year, yearMonth.month , 1)).getDay();
        const currentMonthDays = this.getCurrentMonthDays(yearMonth);
        const prevMonthDays = this.getPreviousMonthDays(yearMonth);
        const nextMonthDays = this.getNextMonthDays(yearMonth);
        dayView.weekDayNames = this.i18n.getWeekdayShortNames();
        dayView.month = yearMonth;
        dayView.days = [] as any;
        let fromPreviousMonth = [];
        if (firstDay > 0) {
            fromPreviousMonth = prevMonthDays.slice(-firstDay);
        }
        let nextLength = 35 - fromPreviousMonth.length - currentMonthDays.length;
        if(nextLength < 0) {
            nextLength = nextLength + 7;
        }
        nextMonthDays.length = nextLength;
        const days = fromPreviousMonth.concat(currentMonthDays).concat(nextMonthDays);
        let weekData = [] as NgeDate[];
        for (let i = 0; i < days.length; i ++) {
            if (i % 7 === 0) {
                weekData = [] as NgeDate[];
                dayView.days.push(weekData);
            }
            weekData.push(days[i]);
        }
        return dayView;

    }
    getMonthViewData(year: number): NgeMonthView {
        const monthView = {} as NgeMonthView;
        monthView.year = year;
        monthView.monthNames = this.i18n.getMonthShortNames();
        monthView.months = [];
        let monthData = [] as NgeYearMonth[];
        for(let i=0; i<12;i++){
            if(i % 4 === 0) {
                monthData = [] as NgeYearMonth[];
                monthView.months.push(monthData);
            }
            monthData.push({year, month: i});
        }
        return monthView;

    }
    getDaysInMonth(yearMonth: NgeYearMonth): number {
        return new Date(yearMonth.year, yearMonth.month + 1, 0).getDate();
    }

    getPreviousMonthDays(ym: NgeYearMonth): NgeDate[] {
        const yearMonth = {year:ym.year, month: ym.month} as NgeYearMonth;
        if (yearMonth.month === 0) {
            yearMonth.year = yearMonth.year-1;
            yearMonth.month = 11;
        } else {
            yearMonth.month = yearMonth.month - 1;
        }
        return this.getCurrentMonthDays(yearMonth);
    }
    getNextMonthDays(ym: NgeYearMonth): NgeDate[] {
        const yearMonth = {year:ym.year, month: ym.month} as NgeYearMonth;
        if (yearMonth.month === 11) {
            yearMonth.year = yearMonth.year + 1;
            yearMonth.month = 0;
        } else {
            yearMonth.month = yearMonth.month + 1;
        }
        return this.getCurrentMonthDays(yearMonth);
    }
    getCurrentMonthDays(yearMonth: NgeYearMonth) {
        const days = this.getDaysInMonth(yearMonth);
        const list =  [] as  NgeDate[];
        for (let i = 1; i <= days; i++) {
            list.push({year: yearMonth.year, month: yearMonth.month, day: i} as NgeDate);
        }
        return list;
    }

    getMonthName(month): string {
        return this.i18n.getMonthFullName(month);
    }
    getNextYearMonth(yearMonth: NgeYearMonth): NgeYearMonth {
        if(yearMonth.month === 11) {
            return {year: ++yearMonth.year, month: 0} as NgeYearMonth;
        }
        return  {year: yearMonth.year, month: ++yearMonth.month} as NgeYearMonth;
    }
    getPreviousYearMonth(yearMonth: NgeYearMonth): NgeYearMonth {
        if(yearMonth.month === 0) {
            return {year: --yearMonth.year, month: 11} as NgeYearMonth;
        }
        return  {year: yearMonth.year, month: --yearMonth.month} as NgeYearMonth;
    }
}
