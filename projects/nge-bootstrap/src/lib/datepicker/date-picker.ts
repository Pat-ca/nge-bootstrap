import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { NgeDatePickerService } from './date-picker.service';
import { NgeDate } from './ngeDate';

@Component({
    selector: 'nge-datepicker',
    template: `<div class="date-picker">
                    <div class="nav">
                        <button><span class="chevron"></span></button>
                        <nav></nav>
                        <button><span class="chevron right"></span></button>
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
    constructor(private cd: ChangeDetectorRef, private app: ApplicationRef, private datePickerService: NgeDatePickerService) {
        this.selectedDate = {} as NgeDate;
    }
    ngOnInit(): void {
        this.initializeDatePicker();
    }
    initializeDatePicker() {
        const today = new Date();
        const data = this.datePickerService.getDayViewData(today.getFullYear(), today.getMonth());
        let weekData = [] as NgeDate[];
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
