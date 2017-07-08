import { Directive, ViewContainerRef, AfterViewInit } from '@angular/core';
import * as Packery from 'packery';

@Directive({
  selector: '[dd-packery]',
  inputs: ['itemClassSelector']
})
export class PackeryDirective {

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  itemClassSelector: string;

  public onItemsReady(){
    this.initializePackery();
  }

  private initializePackery() {
    var nativeElement = this.viewContainerRef.element.nativeElement;
    new Packery(nativeElement, { itemSelector: this.itemClassSelector, gutter: 10, percentPosition: true });
  }
}
