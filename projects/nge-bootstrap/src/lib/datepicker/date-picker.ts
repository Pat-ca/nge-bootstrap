import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { NgeDatePickerService } from './date-picker.service';
import { NgeDatepickerI18n } from './datepicker-i18n';
import { NgeDate, NgeYearMonth } from './ngeDate';
import { NgeDayView, NgeMonthView } from './view';

@Component({
    selector: 'nge-datepicker',
    template: `<div class="date-picker">
                    <div class="nav">
                        <button (click)="movePreviousMonth()" ><span class="chevron"></span></button>
                        <nav>
                            <button (click)="changeToMonthView(dayView.month.year)">{{getMonthName(dayView.month.month)}},&nbsp;{{dayView.month.year}}</button>
                        </nav>
                        <button (click)="moveNextMonth()" ><span class="chevron right"></span></button>
                    </div>

                    <ng-template [ngIf]="dayView" [ngIfElse]="monthViewTemp">
                        <div class="week-name">
                            <span *ngFor="let name of dayView.weekDayNames" >{{name}}</span>
                        </div>
                        <div *ngFor="let week of dayView.days">
                            <a [ngClass]="{'today' : isToday(d)}" tabindex="0" *ngFor="let d of week" >
                            {{d.day}}
                            </a>
                        </div>
                    </ng-template>

                    <ng-template #monthViewTemp>
                        <div *ngFor="let month of monthView.months">
                        </div>
                    </ng-template>
                </div>`,
    styleUrls: ['./date-picker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line: component-class-suffix
export class NgeDatePicker implements OnInit {
    selectedDate: NgeDate;
    dayView = {} as NgeDayView;
    monthView = {} as NgeMonthView;
    currentYearMonth = {} as NgeYearMonth;
    constructor(private cd: ChangeDetectorRef, private app: ApplicationRef, private datePickerService: NgeDatePickerService, private test: NgeDatepickerI18n) {
        this.selectedDate = {} as NgeDate;
    }
    ngOnInit(): void {
        this.initializeDatePicker();
        const test = this.test.getMonthFullName(1);
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
        this.cd.detectChanges();
    }
    isToday(date: NgeDate) {
        const today = new Date();
        return date.year === today.getFullYear() && date.month === today.getMonth() && date.day === today.getDate();
    }
    changeToMonthView(year: number) {

    }
    changeToDayView(yearMonth: NgeYearMonth) {

    }
    
}
