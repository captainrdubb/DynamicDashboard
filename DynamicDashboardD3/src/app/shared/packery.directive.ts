import { Directive, ViewContainerRef } from '@angular/core';
import * as Packery from 'packery';

@Directive({
  selector: '[dd-packery]',
})
export class PackeryDirective {

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  public onItemsReady(itemSelector: string) {
    this.initializePackery(itemSelector);
  }

  private initializePackery(itemSelector: string) {
    let nativeElement = this.viewContainerRef.element.nativeElement;
    let packery = new Packery(nativeElement, { itemSelector: itemSelector, gutter: 20, percentPosition: true });
  }
}
