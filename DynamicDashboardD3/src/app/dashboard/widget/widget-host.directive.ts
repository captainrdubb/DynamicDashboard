import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: 'widget-host'    
})
export class WidgetHost{
    widgetId:number;
    constructor(public viewContainerRef: ViewContainerRef){}
}