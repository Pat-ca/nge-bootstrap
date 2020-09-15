import { formatDate, FormStyle, getLocaleDayNames, getLocaleMonthNames, registerLocaleData, TranslationWidth } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { NgeDate } from './ngeDate';

export function NGE_DATEPICKER_I18N_FACTORY(locale) {
    return new NgeDatepickerI18nDefault(locale);
  }

@Injectable({providedIn: 'root', useFactory: NGE_DATEPICKER_I18N_FACTORY, deps: [LOCALE_ID]})
export abstract class NgeDatepickerI18n {
    abstract getWeekdayShortNames(): string[];
    abstract getMonthShortNames(): string[];
    abstract getWeekdayShortName(weekday: number): string;
    abstract getMonthShortName(month: number, year?: number): string;
    abstract getMonthFullName(month: number, year?: number): string;
    abstract getDayAriaLabel(date: NgeDate): string;

}

@Injectable()
export class NgeDatepickerI18nDefault extends NgeDatepickerI18n {
  private weekdaysShort: Array<string>;
  private monthsShort: Array<string>;
  private monthsFull: Array<string>;

  constructor(@Inject(LOCALE_ID) private _locale: string) {
    super();

    this.weekdaysShort = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
    this.monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this.monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
  }

  getWeekdayShortNames(): string[] { 
      return this.weekdaysShort ; 
  }
  getMonthShortNames(): string[] { 
    return this.monthsShort ; 
  }

  getWeekdayShortName(weekday: number): string { return this.weekdaysShort[weekday] || ''; }

  getMonthShortName(month: number): string { return this.monthsShort[month] || ''; }

  getMonthFullName(month: number): string { return this.monthsFull[month] || ''; }

  getDayAriaLabel(date: NgeDate): string {
    const jsDate = new Date(date.year, date.month, date.day);
    return formatDate(jsDate, 'fullDate', this._locale);
  }
}
