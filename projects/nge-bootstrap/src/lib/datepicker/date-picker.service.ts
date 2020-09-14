import { NgeDate, NgeYearMonth } from './ngeDate';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NgeDatePickerService {
    getDayViewData(yearMonth: NgeYearMonth): NgeDate[] {
        //const days = this.getDaysInMonth(yearMonth);
        const firstDay = (new Date(yearMonth.year, yearMonth.month , 1)).getDay();
        let prevMonthDays = [];
        if(firstDay > 0)
        {
            prevMonthDays = this.getPreviousMonthDays(yearMonth).slice(-firstDay);
        }
        const currentMonthDays = this.getCurrentMonthDays(yearMonth);
        const nextMonthDays = this.getNextMonthDays(yearMonth)
        nextMonthDays.length = (35 - prevMonthDays.length - currentMonthDays.length);
        const viewData = prevMonthDays.concat(currentMonthDays).concat(nextMonthDays);
        return viewData;

    }
    getDaysInMonth(yearMonth: NgeYearMonth): number {
        return new Date(yearMonth.year, yearMonth.month + 1, 0).getDate();
    }

    getPreviousMonthDays(yearMonth: NgeYearMonth): NgeDate[] {
        if (yearMonth.month === 0) {
            yearMonth.year--;
            yearMonth.month = 11;
        } else {
            yearMonth.month--;
        }
        return this.getCurrentMonthDays(yearMonth);
    }
    getNextMonthDays(yearMonth: NgeYearMonth): NgeDate[] {
        if (yearMonth.month === 11) {
            yearMonth.year++;
            yearMonth.month = 0;
        } else {
            yearMonth.month++;
        }
        return this.getCurrentMonthDays(yearMonth);
    }
    getCurrentMonthDays(yearMonth: NgeYearMonth) {
        const days = this.getDaysInMonth(yearMonth);
        const list =  [] as  NgeDate[];
        for (let i = 1; i <= days; i++) {
            list.push({year: yearMonth.year, month:yearMonth.month, day: i} as NgeDate);
        }
        return list;
    }
    getWeekDayNames(length){
        if (length === 2) {
            return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        }else if (length === 3) {
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        }else {
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
    }
    getMonthName(month){
        console.log('month', month);
        const months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
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
