import { Directive, ViewContainerRef, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';

import { EventBusService } from '../core/event-bus.service';

@Directive({
  selector: '[dd-packery]',
})
export class PackeryDirective implements OnDestroy {

  constructor(private viewContainerRef: ViewContainerRef, private eventBusService: EventBusService) {
  }

  private packery: Packery;
  private draggabillySubscription: Subscription;
  private gutter = 2;

  public onItemsReady(itemSelector: string, columnWidth: number) {
    this.initializePackery(itemSelector, columnWidth);
    this.draggabillySubscription = this.eventBusService.getDraggabillyInstance()
      .subscribe((draggabilly: Draggabilly) => this.setDraggabillyEvents(draggabilly));
  }

  public getDefaultColumnWidth(container:ElementRef, itemsCount:number){
    let rowSize = Math.min(3, itemsCount);
    let computedStyle = window.getComputedStyle(container.nativeElement);
    let dashboardPadding = parseFloat(computedStyle.getPropertyValue('padding'));
    let dashboardWidth = parseFloat(computedStyle.getPropertyValue("width"));
    let defaultColumnWidth = Math.ceil(dashboardWidth / rowSize - dashboardPadding * 2);
    this.gutter = Math.floor((dashboardWidth - defaultColumnWidth * rowSize - dashboardPadding * 2) / (rowSize - 1));
    return defaultColumnWidth;
  }

  private initializePackery(itemSelector: string, columnWidth: number) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    this.packery = new Packery(nativeElement, {
      itemSelector: itemSelector,
      gutter: this.gutter,
      percentPosition: true,
      columnWidth: columnWidth,
      transitionDuration: '.8s'
    });
  }

  private setDraggabillyEvents(draggabilly: Draggabilly) {
    this.packery.bindDraggabillyEvents(draggabilly);
  }

  ngOnDestroy(): void {
    this.draggabillySubscription.unsubscribe();
  }
}
