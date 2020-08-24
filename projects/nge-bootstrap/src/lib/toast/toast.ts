import {
    AfterContentInit,
    Attribute,
    Component,
    ContentChild,
    Directive,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
  } from '@angular/core';
  /**
   * This directive allows the usage of HTML markup or other directives
   * inside of the toast's header.
   *
   * @since 5.0.0
   */
// tslint:disable-next-line: directive-selector
@Directive({selector: '[ngeToastHeader]'})
  // tslint:disable-next-line: directive-class-suffix
  export class NgeToastHeader {
  }

  /**
   * Toasts provide feedback messages as notifications to the user.
   * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
   *
   * @since 5.0.0
   */
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'nge-toast',
    exportAs: 'ngeToast',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line: no-host-metadata-property
    host: {
      'role': 'alert',
      '[attr.aria-live]': 'ariaLive',
      'aria-atomic': 'true',
      '[class.toast]': 'true',
      '[class.show]': 'true',
    },
    template: `
      <ng-template #headerTpl>
        <strong class="mr-auto">{{header}}</strong>
      </ng-template>
      <ng-template [ngIf]="contentHeaderTpl || header">
        <div class="toast-header">
          <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
          <button type="button" class="close" aria-label="Close" i18n-aria-label="@@nge.toast.close-aria" (click)="hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </ng-template>
      <div class="toast-body">
        <ng-content></ng-content>
      </div>
    `,
    styleUrls: ['./toast.scss']
  })
  // tslint:disable-next-line: component-class-suffix
  export class NgeToast implements AfterContentInit,
      OnChanges {
    private _timeoutID: NodeJS.Timeout;

    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     */
    @Input() delay: number;

    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     */
    @Input() autohide: boolean;

    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     */
    @Input() header: string;
    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     */
    @ContentChild(NgeToastHeader, {read: TemplateRef, static: true}) contentHeaderTpl: TemplateRef<any>| null = null;

    /**
     * An event fired immediately when toast's `hide()` method has been called.
     * It can only occur in 2 different scenarios:
     * - `autohide` timeout fires
     * - user clicks on a closing cross (&times)
     *
     * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
     * that.
     */
    // tslint:disable-next-line: no-output-rename
    @Output('hide') hideOutput = new EventEmitter<void>();

    constructor(@Attribute('aria-live') public ariaLive: string) {
    }

    ngAfterContentInit() { this._init(); }

    ngOnChanges(changes: SimpleChanges) {
      if ('autohide' in changes) {
        this._clearTimeout();
        this._init();
      }
    }

    hide() {
      this._clearTimeout();
      this.hideOutput.emit();
    }

    private _init() {
      if (this.autohide && !this._timeoutID) {
        this._timeoutID = setTimeout(() => this.hide(), this.delay);
      }
    }

    private _clearTimeout() {
      if (this._timeoutID) {
        clearTimeout(this._timeoutID);
        this._timeoutID = null;
      }
    }
  }
