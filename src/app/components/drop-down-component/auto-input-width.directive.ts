import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[auto]'
})
export class AutoInputWidth {
    numberOfClicks = 0;

/**
 * 监测input框，随内容宽度自动大小
 * @param btn 
 */
    @HostListener('input ', ['$event.target'])
    onClick(btn: HTMLInputElement) {
        // console.log('button', btn, 'number of clicks:', this.numberOfClicks++);
        // alert(btn.value);
        console.log(btn.value + btn.value.length);
        btn.style.width =1+ btn.value.length +"em";
        // btn.width = btn.value.length *2 +"px";
    }

}