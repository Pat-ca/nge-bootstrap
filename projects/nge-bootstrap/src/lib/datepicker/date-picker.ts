import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { NgeDatePickerService } from './date-picker.service';
import { NgeDate, NgeYearMonth } from './ngeDate';

@Component({
    selector: 'nge-datepicker',
    template: `<div class="date-picker">
                    <div class="nav">
                        <button (click)="movePreviousMonth()" ><span class="chevron"></span></button>
                        <nav>
                            <button>{{getMonthName(currentYearMonth.month)}},&nbsp;{{currentYearMonth.year}}</button>
                        </nav>
                        <button (click)="moveNextMonth()" ><span class="chevron right"></span></button>
                    </div>
                    <div>
                        <span *ngFor="let name of weekdayNames" >{{name}}</span>
                    </div>
                    <div *ngFor="let week of viewData">
                        <button *ngFor="let d of week" >
                        {{d.day}}
                        </button>
                    </div>
                </div>`,
    styleUrls: ['./date-picker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line: component-class-suffix
export class NgeDatePicker implements OnInit {
    selectedDate: NgeDate;
    viewData = [] as any;
    weekdayNames = [];
    currentYearMonth = {} as NgeYearMonth;
    constructor(private cd: ChangeDetectorRef, private app: ApplicationRef, private datePickerService: NgeDatePickerService) {
        this.selectedDate = {} as NgeDate;
    }
    ngOnInit(): void {
        this.initializeDatePicker();
    }
    initializeDatePicker() {
        const today = new Date();
        this.currentYearMonth = {year: today.getFullYear(), month: today.getMonth()} as NgeYearMonth;
        this.getDayView(this.currentYearMonth );
    }
    getMonthName(month){
        return this.datePickerService.getMonthName(month);
    }
    moveNextMonth() {
        this.currentYearMonth = this.datePickerService.getNextYearMonth(this.currentYearMonth);
        this.cd.detectChanges();
        this.getDayView(this.currentYearMonth );
    }
    movePreviousMonth() {
        this.currentYearMonth = this.datePickerService.getPreviousYearMonth(this.currentYearMonth);
        this.cd.detectChanges();
        this.getDayView(this.currentYearMonth );

    }
    getDayView(yearMonth){
        const data = this.datePickerService.getDayViewData(yearMonth);
        let weekData = [] as NgeDate[];
        this.viewData = [];
        for (let i = 0; i < data.length; i ++) {
            if (i % 7 === 0) {
                weekData = [] as NgeDate[];
                this.viewData.push(weekData);
            }
            weekData.push(data[i]);
        }
        this.weekdayNames = this.datePickerService.getWeekDayNames(2);
        this.cd.detectChanges();
    }
}
