import { Component, Inject, forwardRef, ContentChildren, QueryList, ChangeDetectorRef, ChangeDetectionStrategy, AfterContentChecked, AfterContentInit } from '@angular/core';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'nge-tab-title',
    // tslint:disable-next-line: no-host-metadata-property
    host: { '[class.active]': 'active', class: '' },
    template: `<button (click)='updateActiveTab()'><ng-content></ng-content></button>`,
    styleUrls: ['./tab-title.scss']
})
// tslint:disable-next-line: component-class-suffix
export class NgeTabTitle {
    active = false;
    constructor(@Inject(forwardRef(() => NgeTabs)) private tabs: NgeTabs) { }

    updateActiveTab() {
        console.log('updateActiveTabByTitle');
        this.tabs.updateActiveTabByTitle(this);
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'nge-tab-content',
    // tslint:disable-next-line: no-host-metadata-property
    host: { '[class.active]': 'active? true : false', class: '' },
    template: `<ng-content *ngIf="active" ></ng-content>`,
    styleUrls: ['./tab-content.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line: component-class-suffix
export class NgeTabContent {
    constructor(private cd: ChangeDetectorRef) {}
    active = false;

    activate() {
        this.active = true;
        console.log('test', this.active);
        this.cd.detectChanges();

    }

    deactivate() {
        this.active = false;
    }
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'nge-tabs',
    template: `
	<div class="">
		<ng-content select="nge-tab-title,.nge-tab-title"></ng-content>
	</div>
	<ng-content select="nge-tab-content,.nge-tab-content"></ng-content>
  `,
    // tslint:disable-next-line: no-host-metadata-property
    host: { class: 'nge-tabs' },
    styleUrls: ['./tab.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line: component-class-suffix
export class NgeTabs implements AfterContentInit {
    @ContentChildren(NgeTabTitle) titles: QueryList<NgeTabTitle>;
    @ContentChildren(NgeTabContent) contents: QueryList<NgeTabContent>;
    activeTitle: NgeTabTitle = null;
    constructor(private cd: ChangeDetectorRef) {}
    ngAfterContentInit(): void {
        this.titles.changes.pipe().subscribe(
            () => this.updateActiveTabByTitle(this.titles.first)
        );
    }
    updateActiveTabByTitle(activeTitle: NgeTabTitle) {
        this.updateActiveTab((titleArr) => titleArr.indexOf(activeTitle));
        this.cd.detectChanges();
    }

    nextTab() {
        this.updateActiveTab((titleArr, lastIndex) => (lastIndex + 1) % titleArr.length);
    }

    private updateActiveTab(nextActiveIndexCb: (titleArr: NgeTabTitle[], lastIndex: number) => number) {
        const titleArr = toArray(this.titles);
        const contentArr = toArray(this.contents);
        const lastIndex = titleArr.indexOf(this.activeTitle);
        const nextIndex = nextActiveIndexCb(titleArr, lastIndex);
        this.activeTitle = titleArr[nextIndex];

        if (lastIndex !== -1) {
            titleArr[lastIndex].deactivate();
            contentArr[lastIndex].deactivate();
        }
        titleArr[nextIndex].activate();
        contentArr[nextIndex].activate();
        this.cd.detectChanges();
    }
}

function toArray<T>(query: QueryList<T>): T[] { // won't be needed in the next alpha
    const result = [];
    query.map(value => result.push(value));
    return result;
}