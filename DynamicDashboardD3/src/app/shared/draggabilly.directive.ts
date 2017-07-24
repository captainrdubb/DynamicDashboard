import { Input, Directive, ViewContainerRef } from '@angular/core';
import * as Draggabilly from 'draggabilly';

import { EventBusService } from '../core/event-bus.service';

@Directive({
  selector: '[dd-draggabilly]'
})
export class DraggabillyDirective {

  constructor(private viewContainerRef: ViewContainerRef, private eventBusService: EventBusService) { }

  draggabilly: Draggabilly

  public onItemsReady(containerSelector: string) {
    this.initializeDraggabilly(containerSelector);
  }

  public enable(): void { 
    this.draggabilly.enable();
  }

  public disable(): void {
    this.draggabilly.disable();
  }

  private initializeDraggabilly(containerSelector: string) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    this.draggabilly = new Draggabilly(nativeElement, { containment: containerSelector });
    this.eventBusService.onDraggabillyInitialized(this.draggabilly);
  }
}