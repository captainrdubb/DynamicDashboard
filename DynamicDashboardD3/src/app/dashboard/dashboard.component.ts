import { Component, AfterViewInit, OnDestroy, ViewChild, ViewChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ElementRef } from '@angular/core';
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
export class DashboardComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('Dashboard destroyed');
  }
  widgetMetadata = [
    { id: 1, widgetType: "DisplayWidgetComponent", chartType:null, columnWidth: "singleWidth" },
    { id: 2, widgetType: "DisplayWidgetComponent", chartType:null, columnWidth: "doubleWidth" },
    { id: 3, widgetType: "ChartWidgetComponent", chartType:'pieChart', columnWidth: "singleWidth" },
    { id: 4, widgetType: "HealthCareWidgetComponent", chartType:null, columnWidth: "doubleWidth" }
  ];
  @ViewChild('dashboard') dashboard: ElementRef;
  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    let packerySizes = this.loadWidgets();
    this.packeryDirective.onItemsReady('.widget', packerySizes.singleWidth);
  }

  private loadWidgets(): IPackerySizes {
    let packerySizes = this.packeryDirective.getPackyerColmunWidths(this.dashboard, this.widgetMetadata.length);
    let viewContainers = this.widgetViewContainers.toArray();
    // for (let i = 0; i < this.widgetMetadata.length; ++i) {
    //   let viewContainerRef = viewContainers[i];
    //   viewContainerRef.clear();

    //   let widgetFactory = this.getComponentFactory(this.widgetMetadata[i].widgetType);
    //   let componentRef = viewContainerRef.createComponent(widgetFactory);
    //   let widget = (<IWidgetComponent>componentRef.instance);
    //   widget.width = columnWidth;
    //   widget.data = this.getData();
    //   componentRef.changeDetectorRef.detectChanges();
    // }

    this.widgetViewContainers.forEach((item:ViewContainerRef, index:number, viewContainers:ViewContainerRef[])=>{
      let viewContainerRef = viewContainers[index];
      viewContainerRef.clear();

      let widgetFactory = this.getComponentFactory(this.widgetMetadata[index].widgetType);
      let componentRef = viewContainerRef.createComponent(widgetFactory);
      let widget = (<IWidgetComponent>componentRef.instance);
      widget.columnWidth = packerySizes[this.widgetMetadata[index].columnWidth];
      widget.chartType = this.widgetMetadata[index].chartType;
      widget.data = this.getData();
      componentRef.changeDetectorRef.detectChanges();
    })
    return packerySizes;
  }

  private getComponentFactory(widgetComponentKey: string) {
    if (!this.widgetComponentFactories[widgetComponentKey]) {
      let widgetComponentType = WidgetModule.WidgetComponents[widgetComponentKey];
      this.widgetComponentFactories[widgetComponentKey] = this.componentFactoryResolver.resolveComponentFactory(widgetComponentType);;
    }
    return this.widgetComponentFactories[widgetComponentKey];
  }

  private getData(): string[][] {
    let data = [["LANLABEL", "LAN", "EST", "state"],
    ["German", "607", "5690", "31"],
    ["Dutch", "610", "335", "31"],
    ["Swedish", "614", "220", "31"],
    ["Danish", "615", "130", "31"],
    ["French", "620", "4755", "31"],
    ["Spanish", "625", "119505", "31"],
    ["Portuguese", "629", "790", "31"],
    ["Romanian", "631", "130", "31"],
    ["Irish Gaelic", "635", "115", "31"],
    ["Ukrainian", "641", "620", "31"],
    ["Czech", "642", "1770", "31"],
    ["Serbocroatian", "649", "265", "31"],
    ["Croatian", "650", "245", "31"],
    ["Lithuanian", "653", "220", "31"],
    ["Kurdish", "658", "955", "31"],
    ["Bengali", "664", "520", "31"],
    ["Panjabi", "665", "225", "31"],
    ["Marathi", "666", "195", "31"],
    ["Nepali", "674", "1110", "31"],
    ["Sinhalese", "677", "145", "31"],
    ["Turkish", "691", "360", "31"],
    ["Telugu", "701", "1055", "31"],
    ["Malayalam", "703", "125", "31"],
    ["Tamil", "704", "770", "31"],
    ["Chinese", "708", "3575", "31"],
    ["Mandarin", "712", "640", "31"],
    ["Tibetan", "716", "175", "31"],
    ["Burmese", "717", "440", "31"],
    ["Karen", "718", "1550", "31"],
    ["Indonesian", "732", "245", "31"],
    ["Bisayan", "743", "155", "31"],
    ["Marshallese", "755", "160", "31"],
    ["Samoan", "767", "100", "31"],
    ["Amharic", "780", "355", "31"],
    ["Cushite", "783", "1965", "31"],
    ["Sudanic", "784", "740", "31"],
    ["Nilotic", "785", "1670", "31"],
    ["Nubian", "787", "110", "31"],
    ["Swahili", "791", "145", "31"],
    ["Bantu", "792", "275", "31"],
    ["Mande", "793", "240", "31"],
    ["Kru, Ibo, Yoruba", "796", "385", "31"],
    ["Dakota", "907", "565", "31"],
    ["Winnebago", "909", "225", "31"],
    ["Omaha", "911", "300", "31"],
    ["Mayan languages", "968", "565", "31"]];
    data.shift()
    return data;
  }
}
