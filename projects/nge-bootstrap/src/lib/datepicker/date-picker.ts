import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { NgeDatePickerService } from './date-picker.service';
import { NgeDate, NgeYearMonth } from './ngeDate';
import { NgeDayView } from './view';

@Component({
    selector: 'nge-datepicker',
    template: `<div class="date-picker">
                    <div class="nav">
                        <button (click)="movePreviousMonth()" ><span class="chevron"></span></button>
                        <nav>
                            <button>{{getMonthName(dayView.month.month)}},&nbsp;{{dayView.month.year}}</button>
                        </nav>
                        <button (click)="moveNextMonth()" ><span class="chevron right"></span></button>
                    </div>
                    <div>
                        <span *ngFor="let name of dayView.weekDayNames" >{{name}}</span>
                    </div>
                    <div *ngFor="let week of dayView.days">
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
    dayView = {} as NgeDayView;
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
        this.getDayView(this.currentYearMonth);
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
        this.dayView = this.datePickerService.getDayViewData(yearMonth);
        console.log(this.dayView);
        this.cd.detectChanges();
    }
}
