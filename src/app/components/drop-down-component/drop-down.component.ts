import {
    NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Input, Output, Renderer2, EventEmitter, ContentChildren,
    QueryList, ViewChild, TemplateRef, forwardRef, ChangeDetectorRef
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SharedModule, PrimeTemplate } from '../common/shared';
import { SelectItem } from '../common/selectitem';

import { InputHandler } from '../util/inputhandler';
import { ObjectUtils } from '../util/objectutils';
export const DROPDOWN_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true
};


@Component({
    selector: 'p-dropdown',
    templateUrl: './test.html',
    //   templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.css'],
    animations: [
        trigger('panelState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    providers: [InputHandler, ObjectUtils, DROPDOWN_VALUE_ACCESSOR]
})
export class DropDownComponent implements OnInit {

    selectValue = new SelectData("", "——请选择——")
    active = "false";
    @Input() data = new Array();
    filterValue = "";
    optionsToDisplay = new Array();
    filterBy = "value";
    constructor(private inputhandler: InputHandler,
        private objectutils: ObjectUtils) {


    }
    ngOnInit() {
          console.log(this.data);
        this.optionsToDisplay = this.data.concat();
    }
 
    test(el: HTMLInputElement, event: Event) {
        console.log(event);
        console.log(el);
        el.value = event.srcElement.textContent;
        //  "打发打发打发打发打发打发的放到放到";
        this.inputhandler.autoWidth(el);
    }

    activeDrop(e: HTMLElement) {
        console.log(this.data);
        if (e.classList.contains("open")) {
            e.classList.remove("open");

        } else {
            e.classList.add("open");
        }
    }
    activeValue(e: HTMLElement) {
        this.selectValue.value = event.srcElement.textContent;
        this.selectValue.id = event.srcElement.id;
        if (e.classList.contains("open")) {
            e.classList.remove("open");
        } else {
            e.classList.add("open");
        }
        event.stopPropagation();
    }
    onFilter(event): void {
        this.optionsToDisplay.length = 0;
        let inputValue = this.objectutils.trim(event.target.value.toLowerCase());
     
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.optionsToDisplay = this.activateFilter();
        }
        else {
            console.log(this.optionsToDisplay);
            this.filterValue = null;
            this.optionsToDisplay = this.data.concat();
            console.log(this.optionsToDisplay);

        }
    }

    activateFilter() {
        let searchFields: string[] = this.filterBy.split(',');
        if (this.data && this.data.length) {
            return this.objectutils.filter(this.data, searchFields, this.filterValue);
        }
    }







}

export class SelectData {
    id: string;
    value: string;
    constructor(id: string, value: string) {
        this.id = id;
        this.value = value;
    }
}




