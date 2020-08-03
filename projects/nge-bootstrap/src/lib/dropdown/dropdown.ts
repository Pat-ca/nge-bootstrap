// tslint:disable-next-line: max-line-length
import { Directive, Input, ElementRef, ContentChildren, QueryList, ContentChild, AfterContentInit, OnDestroy, Renderer2, ChangeDetectorRef, Inject, forwardRef, EventEmitter, Output } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { Key } from '../common/key';


// tslint:disable-next-line: directive-selector
@Directive({ selector: '[ngEbDropdownItem]',
// tslint:disable-next-line: no-host-metadata-property
host: { class: 'dropdown-item',
 '[class.disabled]': 'disabled' } })
// tslint:disable-next-line: directive-class-suffix
export class NgEbDropdownItem {

  // tslint:disable-next-line: variable-name
  private _disabled = false;
  @Input() value: any;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value as any === '' || value === true;  // accept an empty attribute as true
  }

  get disabled(): boolean { return this._disabled; }

  constructor(public elementRef: ElementRef<HTMLElement>) {
   }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngEbDropdownToggle]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'dropdown-toggle',
    '[attr.aria-expanded]': 'dropdown.isOpen()',
    '(click)': 'dropdown.toggle()',
    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowLeft)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowRight)': 'dropdown.onKeyDown($event)',
    '(keydown.Home)': 'dropdown.onKeyDown($event)',
    '(keydown.End)': 'dropdown.onKeyDown($event)',
    '(keydown.F4)': 'dropdown.onKeyDown($event)',
    '(keydown.Tab)': 'dropdown.onKeyDown($event)',
    '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
  },

})
// tslint:disable-next-line: directive-class-suffix
export class NgEbDropdownToggle {
  nativeElement: HTMLElement;
  constructor(@Inject(forwardRef(() => NgEbDropdown)) public dropdown,
              elementRef: ElementRef<HTMLElement>) {
    this.nativeElement = elementRef.nativeElement;
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngEbDropdownMenu]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.dropdown-menu]': 'true',
    '[class.show]': 'dropdown.isOpen()',
    '[attr.x-placement]': 'placement',
    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
    '(keydown.Escape)': 'dropdown.onKeyDown($event)',
    '(keydown.Home)': 'dropdown.onKeyDown($event)',
    '(keydown.End)': 'dropdown.onKeyDown($event)',
    '(keydown.Enter)': 'dropdown.onKeyDown($event)',
    '(keydown.Space)': 'dropdown.onKeyDown($event)',
    '(keydown.Tab)': 'dropdown.onKeyDown($event)',
    '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
  }
})
// tslint:disable-next-line: directive-class-suffix
export class NgEbDropdownMenu {
  @ContentChildren(NgEbDropdownItem) menuItems: QueryList<NgEbDropdownItem>;
  nativeElement: HTMLElement;
  constructor(private cd: ChangeDetectorRef, @Inject(forwardRef(() => NgEbDropdown)) public dropdown) {
  }

}

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[ngEbDropdown]', exportAs: 'ngEbDropdown' })
// tslint:disable-next-line: directive-class-suffix
export class NgEbDropdown implements AfterContentInit, OnDestroy {
  private close$ = new Subject();
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line: variable-name
  @ContentChild(NgEbDropdownMenu, { static: false }) private _menu: NgEbDropdownMenu;
  // tslint:disable-next-line: variable-name
  @ContentChild(NgEbDropdownToggle, { static: false }) private _toggle: NgEbDropdownToggle;

  /**
   * Defines whether or not the dropdown menu is opened initially.
   */
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: no-input-rename
  @Input('open') bOpen = false;
  @Output() openChange = new EventEmitter<boolean>();
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {
  }
  ngOnDestroy(): void {
  }
  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  private getDropdownItems(): NgEbDropdownItem[] {
      const menu = this._menu;
      if (menu == null) {
      return [];
    }
      return menu.menuItems.filter(item => !item.disabled);
  }
  private isEventFromToggle(event: KeyboardEvent) {
    return this._toggle.nativeElement.contains(event.target as HTMLElement);
  }
  isOpen(): boolean { return this.bOpen; }
  open(): void {
    if (!this.bOpen) {
      this.bOpen = true;
      this.openChange.emit(true);
      let dropdownItem: NgEbDropdownItem | null = null;
      const dropdownItems = this.getDropdownItems();
      dropdownItems.forEach((item, index) => {
        this.renderer.setAttribute(item.elementRef.nativeElement, 'tabindex', index + '');
        fromEvent(item.elementRef.nativeElement, 'click').pipe(take(1)).subscribe(() => this.close(item.value));
        if (item.value === this.value) {
          dropdownItem = item;
          this.cd.detectChanges();
        }
      });
      if (dropdownItem) {
        dropdownItem.elementRef.nativeElement.focus();
        this.cd.detectChanges();
      }
    }
  }
  close(selectedValue = null): void {
    if (this.bOpen) {
      if (this._toggle) {
        setTimeout(() => {
          this._toggle.nativeElement.focus();
          this.cd.detectChanges();
        });
      }
      this.bOpen = false;
      if (selectedValue) {
        this.valueChange.emit(selectedValue);
      }
      this.cd.detectChanges();
      this.close$.next();
    }
  }
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    const key = event.which;
    const isEventFromToggle = this.isEventFromToggle(event);
    const dropdownItems = this.getDropdownItems();
    let position = -1;
    let dropdownItem: NgEbDropdownItem | null = null;
    if (dropdownItems.length) {
      dropdownItems.forEach((item, index) => {
        if (item.value === this.value) {
          position = index;
          dropdownItem = item;
        }
      });
    }

    // closing on Enter / Space
    if ((key === Key.Space || key === Key.Enter || key === Key.Escape) && this.isOpen()) {
      this.close();
      return;
    }
    if (key === Key.F4 && !this.isOpen()) {
      this.open();
      return;
    }

    if (key === Key.Tab) {
      if (event.target && this.isOpen()) {
        if (this._toggle.nativeElement === event.target) {
          if (event.shiftKey) {
            this.close();
          }
          return;
        } else {
          fromEvent<FocusEvent>(event.target as HTMLElement, 'focusout').pipe(take(1)).subscribe(({ relatedTarget }) => {
            if (!this.elementRef.nativeElement.contains(relatedTarget as HTMLElement)) {
              this.close();
            }
          });
        }
      }
      return;
    }

    // opening / navigating
    if (isEventFromToggle && !this.isOpen()) {
      // this.open();
      if (dropdownItems.length) {
        switch (key) {
          case Key.ArrowDown:
          case Key.ArrowRight:
            position = Math.min(position + 1, dropdownItems.length - 1);
            break;
          case Key.ArrowUp:
          case Key.ArrowLeft:
            position = Math.max(position - 1, 0);
            break;
          case Key.Home:
            position = 0;
            break;
          case Key.End:
            position = dropdownItems.length - 1;
            break;
        }
        this.valueChange.emit(dropdownItems[position].value);
        this.cd.detectChanges();
      }
      event.preventDefault();
    }
    if (!isEventFromToggle && this.isOpen()) {
      if (dropdownItems.length) {
        switch (key) {
          case Key.ArrowDown:
            position = Math.min(position + 1, dropdownItems.length - 1);
            break;
          case Key.ArrowUp:
            position = Math.max(position - 1, 0);
            break;
          case Key.Home:
            position = 0;
            break;
          case Key.End:
            position = dropdownItems.length - 1;
            break;
        }
        this.valueChange.emit(dropdownItems[position].value);
        dropdownItems[position].elementRef.nativeElement.focus();
        this.cd.detectChanges();
      }
      event.preventDefault();
    }
  }


}
