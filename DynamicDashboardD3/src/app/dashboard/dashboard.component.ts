import { IWidgetParams, IWidgetMenuItem } from './../shared/interfaces';
import { Component, AfterViewInit, OnDestroy, ViewChild, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ElementRef, Type } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaysubject';

import { WidgetModule } from './widget/widget.module';

import { PackeryDirective } from '../shared/packery.directive';
import { WidgetHostDirective } from './widget/widget-host.directive';
import { ChartWidgetComponent } from "./widget/chart-widget/chart-widget.component";
import { IWidgetComponent, IPackerySizes } from '../shared/interfaces';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('dashboard') dashboard: ElementRef;
  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};
  packerySizes: IPackerySizes;

  menuItems = [
    { display: 'Indicator', widgetParams: { ordinal: 1, widgetName: 'HealthCareWidgetComponent', dataParams: null } },
    { display: 'Messanger', widgetParams: { ordinal: 1, widgetName: 'ChatWidgetComponent', dataParams: null } },
    { display: 'Note', widgetParams: { ordinal: 1, widgetName: 'DisplayWidgetComponent', dataParams: null } },
    { display: 'Pie Chart', widgetParams: { ordinal: 1, widgetName: 'ChartWidgetComponent', dataParams: null } }
  ]

  savedWidgetParams: IWidgetParams[] = [
    { ordinal: 1, widgetName: 'DisplayWidgetComponent', dataParams: null },
    { ordinal: 2, widgetName: 'ChatWidgetComponent', dataParams: null },
    { ordinal: 3, widgetName: 'ChartWidgetComponent', dataParams: true },
    { ordinal: 4, widgetName: 'HealthCareWidgetComponent', dataParams: true }
  ];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    let packerySizes = this.loadWidgets();
    this.packeryDirective.onItemsReady('.widget', this.packerySizes.singleWidth);
  }

  private loadWidgets(): void {
    this.packerySizes = this.packeryDirective.getPackyerColmunWidths(this.dashboard, this.savedWidgetParams.length);
    this.widgetViewContainers.forEach((item: ViewContainerRef, index: number, viewContainers: ViewContainerRef[]) => {
      let viewContainerRef = viewContainers[index];
      let savedWidget = this.savedWidgetParams[index];

      this.addWidget(viewContainerRef, savedWidget);
    })
  }

  onMenuItemClicked(menuItem: IWidgetMenuItem) {
    this.savedWidgetParams.push(menuItem.widgetParams);
    let viewContainerRef = this.widgetViewContainers[this.savedWidgetParams.length - 1];
    this.addWidget(viewContainerRef, menuItem.widgetParams);
  }

  addWidget(viewContainerRef: ViewContainerRef, savedWidget: IWidgetParams) {
    viewContainerRef.clear();
    let widgetFactory = this.getComponentFactory(savedWidget.widgetName);
    let componentRef = viewContainerRef.createComponent(widgetFactory);

    let widget = (<IWidgetComponent>componentRef.instance);
    let metadata = WidgetModule.WidgetMetadata[savedWidget.widgetName];
    widget.columnWidth = this.packerySizes[metadata.size];
    if (savedWidget.dataParams) {
      widget.data = this.getData(savedWidget.dataParams);
    }

    componentRef.changeDetectorRef.detectChanges();
  }

  private getComponentFactory(widgetComponentKey: string) {
    if (!this.widgetComponentFactories[widgetComponentKey]) {
      let metadata = WidgetModule.WidgetMetadata[widgetComponentKey];
      this.widgetComponentFactories[widgetComponentKey] = this.componentFactoryResolver.resolveComponentFactory(metadata.type);;
    }
    return this.widgetComponentFactories[widgetComponentKey];
  }

  private getData(dataParams: any): string[][] {
    let data = [["LANLABEL", "LAN", "EST", "state"],
    ["German", "607", "5690", "31"],
    ["French", "620", "4755", "31"],
    ["Spanish", "625", "119505", "31"],
    ["Czech", "642", "1770", "31"],
    ["Nepali", "674", "1110", "31"],
    ["Telugu", "701", "1055", "31"],
    ["Chinese", "708", "3575", "31"],
    ["Karen", "718", "1550", "31"],
    ["Cushite", "783", "1965", "31"],
    ["Nilotic", "785", "1670", "31"]];
    data.shift()
    return data;
  }
}
