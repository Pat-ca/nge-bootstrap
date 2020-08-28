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

export interface ToastConfig {
  text: string;
  delay: number;
  alertType: string;
  autoHide: boolean;
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
      <div class="toast {{show}}" >
          <div class="alert alert-{{alertType}} bar" role="alert">
            <span>{{content}}</span>
            <button type="button" aria-label="Close" (click)="hide()">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
      </div>
    `,
    styleUrls: ['./toast.scss']
  })
  // tslint:disable-next-line: component-class-suffix
  export class NgeToast implements OnChanges {
    private timeoutID: any;
    content = "";
    show = "";
    alertType = 'success';
    private delay = 500;
    private autoHide = true;
    @Input('toastConfig') 
    set toastConfig(config: ToastConfig) {
      if(config) {
        this.content = config.text;
        this.delay = config.delay || this.delay;        
        this.autoHide = config.autoHide || this.autoHide;  
        this.alertType = config.alertType || this.alertType;      
        if(this.content) {
          this.showToast();
        }
  
      }
    }
  
    constructor(@Attribute('aria-live') public ariaLive: string, private cd: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
      if ('autohide' in changes) {
        this.clearToast();
        this.showToast();
      }
    }

    hide() {
      this.clearToast();
    }

    private showToast() {
      this.show = "show";
      if (this.autoHide && !this.timeoutID) {
        this.timeoutID = setTimeout(() => this.hide(), this.delay);
      }
    }

    private clearToast() {
      this.show = "";
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.toastConfig = null;
        this.timeoutID = null;
      }
      this.cd.detectChanges();
    }
  }
