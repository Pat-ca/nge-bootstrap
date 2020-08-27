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
    ChangeDetectorRef,
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
      <div class="toast">
        <div class="toast-header">
        <strong>{{header}}</strong>
          <button type="button" aria-label="Close" i18n-aria-label="@@nge.toast.close-aria" (click)="hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          <ng-content></ng-content>
        </div>
      </div>
    `,
    styleUrls: ['./toast.scss']
  })
  // tslint:disable-next-line: component-class-suffix
  export class NgeToast implements AfterContentInit,
      OnChanges {
    private _timeoutID: any;

    @Input() delay = 500;
    @Input() autoHide = true;
    @Input() header: string;
    @ContentChild(NgeToastHeader, {read: TemplateRef, static: true}) contentHeaderTpl: TemplateRef<any>| null = null;
    // tslint:disable-next-line: no-output-rename
    @Output('hide') hideOutput = new EventEmitter<void>();

    constructor(@Attribute('aria-live') public ariaLive: string, private cd: ChangeDetectorRef) {
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
      if (this.autoHide && !this._timeoutID) {
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
