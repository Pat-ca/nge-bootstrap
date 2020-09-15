import { formatDate, FormStyle, getLocaleDayNames, getLocaleMonthNames, registerLocaleData, TranslationWidth } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { NgeDate } from './ngeDate';
import localeFr from '@angular/common/locales/fr-CA';

export function NGE_DATEPICKER_18N_FACTORY(locale) {
    locale = "fr-CA";
    registerLocaleData(localeFr, locale);
    return new NgeDatepickerI18nDefault(locale);
  }

@Injectable({providedIn: 'root', useFactory: NGE_DATEPICKER_18N_FACTORY, deps: [LOCALE_ID]})
export abstract class NgeDatepickerI18n {
  /**
   * Returns the short weekday name to display in the heading of the month view.
   *
   * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
   */
  abstract getWeekdayShortName(weekday: number): string;

  /**
   * Returns the short month name to display in the date picker navigation.
   *
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   */
  abstract getMonthShortName(month: number, year?: number): string;

  /**
   * Returns the full month name to display in the date picker navigation.
   *
   * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
   */
  abstract getMonthFullName(month: number, year?: number): string;

  /**
   * Returns the value of the `aria-label` attribute for a specific date.
   *
   * @since 2.0.0
   */
  abstract getDayAriaLabel(date: NgeDate): string;

  /**
   * Returns the textual representation of a day that is rendered in a day cell.
   *
   * @since 3.0.0
   */
  getDayNumerals(date: NgeDate): string { return `${date.day}`; }

  /**
   * Returns the textual representation of a week number rendered by datepicker.
   *
   * @since 3.0.0
   */
  getWeekNumerals(weekNumber: number): string { return `${weekNumber}`; }

  /**
   * Returns the textual representation of a year that is rendered in the datepicker year select box.
   *
   * @since 3.0.0
   */
  getYearNumerals(year: number): string { return `${year}`; }
}

@Injectable()
export class NgeDatepickerI18nDefault extends NgeDatepickerI18n {
  private _weekdaysShort: Array<string>;
  private _monthsShort: Array<string>;
  private _monthsFull: Array<string>;

  constructor(@Inject(LOCALE_ID) private _locale: string) {
    super();

    const weekdaysStartingOnSunday = getLocaleDayNames(_locale, FormStyle.Standalone, TranslationWidth.Short);
    this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);

    this._monthsShort = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this._monthsFull = getLocaleMonthNames(_locale, FormStyle.Standalone, TranslationWidth.Wide);
  }

  getWeekdayShortName(weekday: number): string { return this._weekdaysShort[weekday - 1] || ''; }

  getMonthShortName(month: number): string { return this._monthsShort[month - 1] || ''; }

  getMonthFullName(month: number): string { return this._monthsFull[month - 1] || ''; }

  getDayAriaLabel(date: NgeDate): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return formatDate(jsDate, 'fullDate', this._locale);
  }
}
