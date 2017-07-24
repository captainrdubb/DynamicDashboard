import { Component, AfterViewInit, OnDestroy, ViewChild, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaysubject';

import { WidgetModule } from './widget/widget.module';

import { IColumnWidth } from '../shared/interfaces';
import { PackeryDirective } from '../shared/packery.directive';
import { WidgetHostDirective } from './widget/widget-host.directive';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('Dashboard destroyed');
  }
  widgets = [
    { id: 1, widgetType: "DisplayWidgetComponent" },
    { id: 2, widgetType: "ChartWidgetComponent" },
    { id: 3, widgetType: "ChartWidgetComponent" }
  ];
  @ViewChild('dashboard') dashboard: ElementRef;
  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    let columnWidth = this.loadWidgets();
    this.packeryDirective.onItemsReady('.widget', columnWidth);
  }

private loadWidgets(): number {
    let columnWidth = Math.floor(this.dashboard.nativeElement.clientWidth / this.widgets.length) - 1;
    let viewContainers = this.widgetViewContainers.toArray();
    for (let i = 0; i < this.widgets.length; ++i) {
      let widget = this.widgets[i];
      let viewContainerRef = viewContainers[i];
      viewContainerRef.clear();

      let widgetFactory = this.getComponentFactory(widget.widgetType);
      let componentRef = viewContainerRef.createComponent(widgetFactory);
      (<IColumnWidth>componentRef.instance).defaultWidth = columnWidth;
      componentRef.changeDetectorRef.detectChanges();
    }
    return columnWidth;
  }

  private getComponentFactory(widgetComponentKey: string) {
    if (!this.widgetComponentFactories[widgetComponentKey]) {
      let widgetComponentType = WidgetModule.WidgetComponents[widgetComponentKey];
      this.widgetComponentFactories[widgetComponentKey] = this.componentFactoryResolver.resolveComponentFactory(widgetComponentType);;
    }
    return this.widgetComponentFactories[widgetComponentKey];
  }
}
