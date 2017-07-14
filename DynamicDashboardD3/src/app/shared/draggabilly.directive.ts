import { Directive, ViewContainerRef } from '@angular/core';
import * as Draggabilly from 'draggabilly';

import { EventBusService } from '../core/event-bus.service';

@Directive({
  selector: '[dd-draggabilly]'
})
export class DraggabillyDirective {

  constructor(private viewContainerRef: ViewContainerRef, private eventBusService: EventBusService) { }

  public onItemsReady(containerSelector: string) {
    this.initializeDraggabilly(containerSelector);
  }

  private initializeDraggabilly(containerSelector: string) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    let draggabilly = new Draggabilly(nativeElement, { containment: containerSelector });
    this.eventBusService.onDraggabillyInitialized(draggabilly);
  }
}