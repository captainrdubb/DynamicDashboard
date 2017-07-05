import { Component, AfterViewInit, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, Type, ComponentFactory } from '@angular/core';

import { WidgetHostDirective } from './widget/widget-host.directive';
import { WidgetModule } from './widget/widget.module';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};
  widgets = [
    { id: 1, widgetType: "DisplayWidgetComponent" },
    { id: 2, widgetType: "ChartWidgetComponent" },
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    this.loadWidgets();
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
