// tslint:disable-next-line: max-line-length
import {
  Directive,
  Input,
  ElementRef,
  ContentChildren,
  QueryList,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  Renderer2,
  ChangeDetectorRef,
  Inject,
  forwardRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Key } from '../common/key';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// tslint:disable-next-line: directive-selector
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngeDropdownItem]',
  // tslint:disable-next-line: no-host-metadata-property
  host: { class: 'dropdown-item', '[class.disabled]': 'disabled' },
})
// tslint:disable-next-line: directive-class-suffix
export class NgeDropdownItem {
  // tslint:disable-next-line: variable-name
  private _disabled = false;
  @Input() value: any;
  @Input()
  set disabled(value: boolean) {
    this._disabled = (value as any) === '' || value === true; // accept an empty attribute as true
  }

  get disabled(): boolean {
    return this._disabled;
  }

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngeDropdownToggle]',
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
    '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
  },
})
// tslint:disable-next-line: directive-class-suffix
export class NgeDropdownToggle {
  nativeElement: HTMLElement;
  constructor(
    @Inject(forwardRef(() => NgeDropdown)) public dropdown,
    elementRef: ElementRef<HTMLElement>
  ) {
    this.nativeElement = elementRef.nativeElement;
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngeDropdownMenu]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.dropdown-menu]': 'true',
    '[class.show]': 'dropdown.isOpen()',
    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
    '(keydown.Escape)': 'dropdown.onKeyDown($event)',
    '(keydown.Home)': 'dropdown.onKeyDown($event)',
    '(keydown.End)': 'dropdown.onKeyDown($event)',
    '(keydown.Enter)': 'dropdown.onKeyDown($event)',
    '(keydown.Space)': 'dropdown.onKeyDown($event)',
    '(keydown.Tab)': 'dropdown.onKeyDown($event)',
    '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
  },
})
// tslint:disable-next-line: directive-class-suffix
export class NgeDropdownMenu implements OnInit, OnDestroy {
  @ContentChildren(NgeDropdownItem) menuItems: QueryList<NgeDropdownItem>;
  nativeElement: HTMLElement;
  private destroy$ = new Subject();
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(forwardRef(() => NgeDropdown)) public dropdown,
    elementRef: ElementRef<HTMLElement>
  ) {
    this.nativeElement = elementRef.nativeElement;
  }
  ngOnInit(): void {
    fromEvent<FocusEvent>(this.nativeElement, 'focusout')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ relatedTarget }) => {
        if (!this.nativeElement.contains(relatedTarget as HTMLElement)) {
          this.dropdown.close();
        }
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[ngeDropdown]', exportAs: 'ngeDropdown' })
// tslint:disable-next-line: directive-class-suffix
export class NgeDropdown implements AfterContentInit, OnDestroy {
  public close$ = new Subject();
  @Input() value: any;
  @Input() name: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line: variable-name
  @ContentChild(NgeDropdownMenu, { static: false })
  private dropdownMenu: NgeDropdownMenu;
  // tslint:disable-next-line: variable-name
  @ContentChild(NgeDropdownToggle, { static: false })
  private toggleElement: NgeDropdownToggle;

  /**
   * Defines whether or not the dropdown menu is opened initially.
   */
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: no-input-rename
  @Input('open') bOpen = false;
  @Output() openChange = new EventEmitter<boolean>();
  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter<any>();
  private hiddenField: HTMLInputElement;
  private dropdownItems: NgeDropdownItem[];
  private dropdownItem: NgeDropdownItem | null = null;
  private position = -1;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }
  ngOnDestroy(): void {
    this.close$.next();
    this.close$.complete();
  }
  ngAfterContentInit(): void {
    this.hiddenField = document.createElement('input');
    this.hiddenField.setAttribute('type', 'hidden');
    if (this.name) {
      this.hiddenField.setAttribute('name', this.name);
    }
    this.cd.detectChanges();
  }

  private getDropdownItems(): NgeDropdownItem[] {
    const menu = this.dropdownMenu;
    if (menu == null) {
      return [];
    }
    return menu.menuItems.filter((item) => !item.disabled);
  }
  private isEventFromToggle(event: KeyboardEvent) {
    return this.toggleElement.nativeElement.contains(event.target as HTMLElement);
  }
  isOpen(): boolean {
    return this.bOpen;
  }
  open(): void {
    this.position = -1;
    this.dropdownItem = null;
    if (!this.bOpen) {
      this.bOpen = true;
      this.openChange.emit(true);
      this.dropdownItems = this.getDropdownItems();
      if (this.dropdownItems) {
        this.dropdownItems.forEach((item, index) => {
          this.renderer.setAttribute(
            item.elementRef.nativeElement,
            'tabindex',
            index + ''
          );
          fromEvent(item.elementRef.nativeElement, 'click')
            .pipe(take(1))
            .subscribe(() => {
              this.changeValue(item.value);
              this.cd.detectChanges();
              this.close();
            });
          if (this.value && item.value === this.value) {
            this.dropdownItem = item;
            this.position = index;
          }
        });
      }
      if (this.dropdownItem) {
        setTimeout(() => {
          this.dropdownItem.elementRef.nativeElement.focus();
        });
      } else if (this.dropdownItems) {
        this.position = 0;
        setTimeout(() => {
          this.dropdownItems[0].elementRef.nativeElement.focus();
        });
      }
      this.cd.detectChanges();
    }
  }
  close(): void {
    if (this.bOpen) {
      this.bOpen = false;
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
  changeValue(value: any) {
    this.valueChange.emit(value);
    this.hiddenField.value = value;
    this.change.emit(value);
  }
  onKeyDown(event: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    const key = event.which;
    const isEventFromToggle = this.isEventFromToggle(event);
    // closing on Enter / Space
    if (
      (key === Key.Space || key === Key.Enter || key === Key.Escape) &&
      this.isOpen()
    ) {
      if (this.toggleElement) {
        setTimeout(() => {
          this.toggleElement.nativeElement.focus();
        });
      }
      this.close();
      return;
    }
    if (key === Key.F4 && !this.isOpen()) {
      this.open();
      return;
    }

    if (key === Key.Tab) {
      if (event.target && this.isOpen()) {
        if (this.toggleElement.nativeElement === event.target) {
          if (event.shiftKey) {
            this.close();
          }
          return;
        } else {
          fromEvent<FocusEvent>(event.target as HTMLElement, 'focusout')
            .pipe(take(1))
            .subscribe(({ relatedTarget }) => {
              this.close();
            });
        }
      }
      return;
    }

    // opening / navigating
    if (isEventFromToggle && !this.isOpen()) {
      // this.open();
      if (this.dropdownItems.length) {
        switch (key) {
          case Key.ArrowDown:
          case Key.ArrowRight:
            this.position = Math.min(this.position + 1, this.dropdownItems.length - 1);
            break;
          case Key.ArrowUp:
          case Key.ArrowLeft:
            this.position = Math.max(this.position - 1, 0);
            break;
          case Key.Home:
            this.position = 0;
            break;
          case Key.End:
            this.position = this.dropdownItems.length - 1;
            break;
        }
        this.changeValue(this.dropdownItems[this.position].value);
        this.cd.detectChanges();
      }
      event.preventDefault();
    }
    if (!isEventFromToggle && this.isOpen()) {
      if (this.dropdownItems.length) {
        switch (key) {
          case Key.ArrowDown:
            this.position = Math.min(this.position + 1, this.dropdownItems.length - 1);
            break;
          case Key.ArrowUp:
            this.position = Math.max(this.position - 1, 0);
            break;
          case Key.Home:
            this.position = 0;
            break;
          case Key.End:
            this.position = this.dropdownItems.length - 1;
            break;
        }
        this.changeValue(this.dropdownItems[this.position].value);
        this.dropdownItems[this.position].elementRef.nativeElement.focus();
        this.cd.detectChanges();
      }
      event.preventDefault();
    }
  }
}
