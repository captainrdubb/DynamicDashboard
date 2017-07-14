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

  public onItemsReady(itemSelector: string) {
    this.initializePackery(itemSelector);
    this.draggabillySubscription = this.eventBusService.getDraggabillyInstance()
      .subscribe((draggabilly: Draggabilly) => this.setDraggabillyEvents(draggabilly));
  }

  private initializePackery(itemSelector: string) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    this.packery = new Packery(nativeElement, { itemSelector: itemSelector, gutter: 20, percentPosition: true, columnWidth: 400 });
  }

  private setDraggabillyEvents(draggabilly: Draggabilly) {
    this.packery.bindDraggabillyEvents(draggabilly);
  }

  ngOnDestroy(): void {
    this.draggabillySubscription.unsubscribe();
  }
}
