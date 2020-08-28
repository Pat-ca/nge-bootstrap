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
      <div class="toast show">
          <div class="alert alert-{{option}} bar" role="alert">
            <span>{{header}}</span>
            <button type="button" aria-label="Close" (click)="hide()">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
      </div>
    `,
    styleUrls: ['./toast.scss']
  })
  // tslint:disable-next-line: component-class-suffix
  export class NgeToast implements AfterContentInit,
      OnChanges {
    private timeoutID: any;

    @Input() delay = 500;
    @Input() autoHide = true;
    @Input() header: string;
    @Input() option: string = 'success';
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
      if (this.autoHide && !this.timeoutID) {
        this.timeoutID = setTimeout(() => this.hide(), this.delay);
      }
    }

    private _clearTimeout() {
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }
    }
  }
