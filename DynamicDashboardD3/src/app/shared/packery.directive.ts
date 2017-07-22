import { Directive, ViewContainerRef, OnDestroy } from '@angular/core';
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

  packery: Packery;
  draggabillySubscription: Subscription;

  public onItemsReady(itemSelector: string, columnWidth: number) {
    this.initializePackery(itemSelector, columnWidth);
    this.draggabillySubscription = this.eventBusService.getDraggabillyInstance()
      .subscribe((draggabilly: Draggabilly) => this.setDraggabillyEvents(draggabilly));
  }

  private initializePackery(itemSelector: string, columnWidth: number) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    this.packery = new Packery(nativeElement, {
      itemSelector: itemSelector,
      gutter: 1,
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
