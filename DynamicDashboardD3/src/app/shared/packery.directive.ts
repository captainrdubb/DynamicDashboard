import { IWidgetComponent, IPosition, IPositionParam } from './interfaces';
import { Directive, ViewContainerRef, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';

import { EventBusService } from '../core/event-bus.service';
import { IPackerySizes } from 'app/shared/interfaces';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dd-packery]',
})
export class PackeryDirective implements OnDestroy {

  private packery: Packery;
  private draggabillySubscription: Subscription;
  private gutter = 2;

  constructor(private viewContainerRef: ViewContainerRef, private eventBusService: EventBusService) {
  }

  public onItemsReady(itemSelector: string, columnWidth: number, positionParams: IPositionParam[]) {
    this.initializePackery(itemSelector, columnWidth, positionParams);
    this.draggabillySubscription = this.eventBusService.getDraggabillyInstance()
      .subscribe((draggabilly: Draggabilly) => this.setDraggabillyEvents(draggabilly));
  }

  public getPackyerColmunWidths(container: ElementRef, itemsCount: number): IPackerySizes {
    const rowSize = Math.min(3, itemsCount);
    const computedStyle = window.getComputedStyle(container.nativeElement);
    const dashboardPadding = parseFloat(computedStyle.getPropertyValue('padding'));
    const dashboardWidth = parseFloat(computedStyle.getPropertyValue('width'));
    const defaultColumnWidth = Math.ceil(dashboardWidth / rowSize - dashboardPadding * 2);
    this.gutter = Math.floor((dashboardWidth - defaultColumnWidth * rowSize - dashboardPadding * 2) / (rowSize - 1));
    const packerySizes: IPackerySizes = {
      singleWidth: defaultColumnWidth,
      doubleWidth: defaultColumnWidth * 2 + this.gutter,
      fullWidth: defaultColumnWidth * 3 + this.gutter * 2
    }
    return packerySizes;
  }

  private initializePackery(itemSelector: string, columnWidth: number, positionParams: IPositionParam[]) {
    const nativeElement = this.viewContainerRef.element.nativeElement;
    this.packery = new Packery(nativeElement, {
      initLayout: false,
      itemSelector: itemSelector,
      gutter: this.gutter,
      percentPosition: true,
      columnWidth: columnWidth,
      transitionDuration: '.8s'
    });
    positionParams.forEach((param: IPositionParam, index: number, params: IPositionParam[]) => {
      const item = this.packery.getItem(param.element);
      item.rect.x = param.position.x;
      item.rect.y = param.position.y;
    })
    this.packery.shiftLayout();
  }

  private setDraggabillyEvents(draggabilly: Draggabilly) {
    this.packery.bindDraggabillyEvents(draggabilly);
  }

  onItemAppend(element: HTMLElement): IPosition {
    this.packery.appended(element);
    const packeryItem = this.packery.getItem(element);
    return { x: packeryItem.rect.x, y: packeryItem.rect.y }
  }

  onItemRemove(element: HTMLElement) {
    this.packery.remove(element);
  }

  refreshLayout() {
    this.packery.shiftLayout();
  }

  ngOnDestroy(): void {
    this.draggabillySubscription.unsubscribe();
  }
}
