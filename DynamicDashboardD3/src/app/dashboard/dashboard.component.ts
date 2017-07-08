import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, Type, ComponentFactory, ElementRef } from '@angular/core';

import { PackeryDirective } from 'app/shared/packery.directive';
import { WidgetHostDirective } from './widget/widget-host.directive';
import { WidgetModule } from './widget/widget.module';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']  
})
export class DashboardComponent implements AfterViewInit {
  packery: any;
  widgets = [
    { id: 1, widgetType: "DisplayWidgetComponent" },
    { id: 2, widgetType: "ChartWidgetComponent" },
  ];
  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private parentElementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.loadWidgets();
    this.packeryDirective.onItemsReady();
  }

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
