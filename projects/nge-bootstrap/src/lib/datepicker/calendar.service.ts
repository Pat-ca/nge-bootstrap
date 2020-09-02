import { NgeDateStruct } from './ngeDateStruct';

export class calendarService {
    getDayViewData(date: Date): NgeDateStruct[] {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = this.getDaysInMonth(year, month);
        var firstDay = new Date(year, month, 1).getDay();
        for(var i = 0; i < 5;i++) {

        }
        return days;

    }
    getDaysInMonth(year, month): number {
        return new Date(year, month + 1, 0).getDate();
    }

    getYearMonth(date: Date): any {
        return {
            year:  date.getFullYear(),
            month: date.getMonth()
        };
    }
    getPreviousMonthDays(year, month): NgeDateStruct[] {
       if(month == 0) {
           year --;
           month = 11;
       }else {
           month --;
       }
       const days = this.getDaysInMonth(year, month);
       for(var i= 1; i < days; i++ ) {
           
       }
       return days.map(d => {} as  NgeDateStruct)

    }
    
}