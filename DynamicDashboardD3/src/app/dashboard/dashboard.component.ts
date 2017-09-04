import {
  Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, ElementRef, Type, AfterViewChecked
} from '@angular/core';
import { IWidgetParams, IWidgetMenuItem } from './../shared/interfaces';
import { WidgetModule } from './widget/widget.module';
import { PackeryDirective } from '../shared/packery.directive';
import { WidgetHostDirective } from './widget/widget-host.directive';
import { IWidgetComponent, IPackerySizes } from '../shared/interfaces';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild('dashboard') dashboard: ElementRef;
  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};
  packerySizes: IPackerySizes;
  widgetAdded: boolean;

  menuItems = [
    { display: 'Indicator', widgetParams: { id: 1, widgetName: 'HealthCareWidgetComponent', dataParams: null } },
    { display: 'Messanger', widgetParams: { id: 1, widgetName: 'ChatWidgetComponent', dataParams: null } },
    { display: 'Note', widgetParams: { id: 1, widgetName: 'DisplayWidgetComponent', dataParams: null } },
    { display: 'Pie Chart', widgetParams: { id: 1, widgetName: 'ChartWidgetComponent', dataParams: true } }
  ]

  savedWidgetParams: IWidgetParams[] = [
    { id: 1, widgetName: 'DisplayWidgetComponent', dataParams: null, position: { x: 0, y: 0 } },
    { id: 2, widgetName: 'ChatWidgetComponent', dataParams: null, position: { x: 355, y: 0 } },
    { id: 3, widgetName: 'ChartWidgetComponent', dataParams: true, position: { x: 0, y: 419 } },
    { id: 4, widgetName: 'HealthCareWidgetComponent', dataParams: true, position: { x: 355, y: 419 } }
  ];

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  onMenuItemClicked(menuItem: IWidgetMenuItem) {
    this.widgetAdded = true;
    this.savedWidgetParams.push(menuItem.widgetParams);
  }

  ngAfterViewChecked(): void {
    if (this.widgetAdded) {
      const index = this.savedWidgetParams.length - 1;
      const widgetParams = this.savedWidgetParams[index];
      const viewContainerRef = this.widgetViewContainers.last;
      const widget = this.addWidget(viewContainerRef, widgetParams);
      const position = this.packeryDirective.onItemAppend(widget.nativeElement.firstElementChild);
      widgetParams.position = position;
      this.widgetAdded = false;
    }
    this.packeryDirective.refreshLayout();
  }

  ngAfterViewInit(): void {
    const packerySizes = this.loadWidgets();
    this.packeryDirective.onItemsReady('.widget', this.packerySizes.singleWidth);
  }

  addWidget(widgetContainerRef: ViewContainerRef, savedWidget: IWidgetParams): ElementRef {
    widgetContainerRef.clear();
    const widgetFactory = this.getComponentFactory(savedWidget.widgetName);
    const componentRef = widgetContainerRef.createComponent(widgetFactory);

    const widget = componentRef.instance as IWidgetComponent;
    const metadata = WidgetModule.WidgetMetadata[savedWidget.widgetName];
    widget.columnWidth = this.packerySizes[metadata.size];
    widget.destroy = () => {
      const index = this.savedWidgetParams.indexOf(savedWidget, 0);
      this.savedWidgetParams.splice(index, 1);
      this.packeryDirective.onItemRemove(componentRef.location.nativeElement.firstElementChild);
    }
    if (savedWidget.dataParams) {
      widget.data = this.getData(savedWidget.dataParams);
    }

    componentRef.changeDetectorRef.detectChanges();
    return componentRef.location;
  }

  private loadWidgets(): void {
    this.packerySizes = this.packeryDirective.getPackyerColmunWidths(this.dashboard, this.savedWidgetParams.length);
    this.widgetViewContainers.forEach((viewContainerRef: ViewContainerRef, index: number, viewContainers: ViewContainerRef[]) => {
      const savedWidget = this.savedWidgetParams[index];
      this.addWidget(viewContainerRef, savedWidget);
    })
  }

  private getComponentFactory(widgetComponentKey: string) {
    if (!this.widgetComponentFactories[widgetComponentKey]) {
      const metadata = WidgetModule.WidgetMetadata[widgetComponentKey];
      this.widgetComponentFactories[widgetComponentKey] = this.componentFactoryResolver.resolveComponentFactory(metadata.type);
    }
    return this.widgetComponentFactories[widgetComponentKey];
  }

  private getData(dataParams: any): string[][] {
    const data = [['LANLABEL', 'LAN', 'EST', 'state'],
    ['German', '607', '5690', '31'],
    ['French', '620', '4755', '31'],
    ['Spanish', '625', '119505', '31'],
    ['Czech', '642', '1770', '31'],
    ['Nepali', '674', '1110', '31'],
    ['Telugu', '701', '1055', '31'],
    ['Chinese', '708', '3575', '31'],
    ['Karen', '718', '1550', '31'],
    ['Cushite', '783', '1965', '31'],
    ['Nilotic', '785', '1670', '31']];
    data.shift()
    return data;
  }
}
