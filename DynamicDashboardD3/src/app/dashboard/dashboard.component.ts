import { Component, AfterViewInit, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { WidgetHostDirective } from './widget/widget-host.directive';
import { WidgetComponent } from './widget/widget.component';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    this.loadWidgets();
  }

  private loadWidgets() {
    let widgetFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetComponent); 
    this.widgetViewContainers.forEach(viewContainer => {
      viewContainer.clear();
      viewContainer.createComponent(widgetFactory);
    });
  }
  widgets = [
    { id: 1 },
    { id: 2 },
  ];

}
