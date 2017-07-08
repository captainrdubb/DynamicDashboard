import { Directive, ViewContainerRef } from '@angular/core';

import * as Draggabilly from 'draggabilly';

@Directive({
  selector: '[dd-draggabilly]'
})
export class DraggabillyDirective {

  constructor(private viewContainerRef: ViewContainerRef) { }

  public onItemsReady(containerSelector: string) {
    this.initializeDraggabilly(containerSelector);
  }

  private initializeDraggabilly(containerSelector: string) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    let draggabilly = new Draggabilly(nativeElement, { containment: containerSelector });
  }
}