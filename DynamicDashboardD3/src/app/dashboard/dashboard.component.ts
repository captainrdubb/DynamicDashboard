import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaysubject';

import { WidgetModule } from './widget/widget.module';

import { PackeryDirective } from '../shared/packery.directive';
import { WidgetHostDirective } from './widget/widget-host.directive';
import { EventBusService } from '../core/event-bus.service';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  packery: any;

  widgetsReadyCount: number = 0;
  widgetsReady: boolean[] = [false, false];
  widgets = [
    { id: 1, widgetType: "DisplayWidgetComponent" },
    { id: 2, widgetType: "ChartWidgetComponent" },
  ];
  widgetsReadyMap: { [key: number]: number } = {};

  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private parentElementRef: ElementRef, private eventBusService: EventBusService) {
    let widgetIndex = 0;
    this.widgets.forEach((widget) => {
      this.widgetsReadyMap[widget.id] = widgetIndex;
      widgetIndex++;
    });
  }

  ngAfterViewInit(): void {
    this.loadWidgets();
    this.packeryDirective.onItemsReady('.widget');
    // this.eventBusService.subscribeOnDragItemReady()
    //   .subscribe((itemId: number) => this.onDragItemReady(itemId));
  }

  // private onDragItemReady(itemId: number) {
  //   let widgetIndex = this.widgetsReadyMap[itemId];
  //   if (this.widgetsReady[widgetIndex] === false) {
  //     this.widgetsReady[widgetIndex] = true;
  //     this.widgetsReadyCount++;
  //   }
  //   if (this.widgetsReadyCount === this.widgets.length) {
  //     this.packeryDirective.onItemsReady('.widget', '.dashboard', '.drag-hangle');
  //   }
  // }

  private loadWidgets() {
    let viewContainers = this.widgetViewContainers.toArray();
    for (let i = 0; i < this.widgets.length; ++i) {
      let widget = this.widgets[i];
      let viewContainerRef = viewContainers[i];
      viewContainerRef.clear();

      let widgetFactory = this.getComponentFactory(widget.widgetType);
      viewContainerRef.createComponent(widgetFactory);
    }
  }

  private getComponentFactory(widgetComponentKey: string) {
    if (!this.widgetComponentFactories[widgetComponentKey]) {
      let widgetComponentType = WidgetModule.WidgetComponents[widgetComponentKey];
      this.widgetComponentFactories[widgetComponentKey] = this.componentFactoryResolver.resolveComponentFactory(widgetComponentType);;
    }
    return this.widgetComponentFactories[widgetComponentKey];
  }
}
