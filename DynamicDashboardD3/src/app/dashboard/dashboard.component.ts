import {
  Component, ComponentRef, AfterViewInit, ViewChild, ViewChildren, QueryList, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, ElementRef, Type, AfterViewChecked, OnInit
} from '@angular/core';
import { IWidgetParams, IWidgetMenuItem, IPositionParam } from './../shared/interfaces';
import { WidgetModule } from './widget/widget.module';
import { PackeryDirective } from '../shared/packery.directive';
import { WidgetHostDirective } from './widget/widget-host.directive';
import { IWidgetComponent, IPackerySizes } from '../shared/interfaces';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('dashboard') dashboard: ElementRef;
  @ViewChild(PackeryDirective) packeryDirective: PackeryDirective;
  @ViewChildren(WidgetHostDirective, { read: ViewContainerRef }) widgetViewContainers: QueryList<ViewContainerRef>;
  widgetComponentFactories: { [key: string]: ComponentFactory<{}> } = {};
  packerySizes: IPackerySizes;
  newWidgetId: number;
  userWidgets: IWidgetParams[];
  widgetMap: Map<number, IWidgetParams> = new Map();

  menuItems = [
    { display: 'Indicator', widgetParams: { widgetName: WidgetModule.WIDGET_KEYS.GRAPHIC, dataParams: null, size: 'doubleSize' } },
    { display: 'Messanger', widgetParams: { widgetName: WidgetModule.WIDGET_KEYS.CHAT, dataParams: null, size: 'doubleSize' } },
    { display: 'Note', widgetParams: { widgetName: WidgetModule.WIDGET_KEYS.NOTE, dataParams: null, size: 'singleSize' } },
    { display: 'Pie Chart', widgetParams: { widgetName: WidgetModule.WIDGET_KEYS.CHART, dataParams: true, size: 'singleSize' } }
  ]

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.userWidgets = this.getUserWidgets();
  }

  ngAfterViewInit(): void {
    this.loadWidgets(this.userWidgets);
    const positionParams = this.userWidgets.map((userWidget: IWidgetParams) => {
      return { element: userWidget.element, position: userWidget.position }
    });
    this.packeryDirective.onItemsReady('.widget', this.packerySizes.singleWidth, positionParams, this.onPositionsChanged);
  }

  ngAfterViewChecked(): void {
    if (this.newWidgetId) {
      const widgetParams = this.widgetMap.get(this.newWidgetId);
      const viewContainerRef = this.widgetViewContainers.last;
      this.addWidget(viewContainerRef, widgetParams);

      widgetParams.position = this.packeryDirective.onItemAppend(widgetParams.element);

      this.newWidgetId = undefined;
    }
    this.packeryDirective.refreshLayout();
  }

  onMenuItemClicked(menuItem: IWidgetMenuItem) {
    const idBuffer = this.getRandomIds(1);
    this.newWidgetId = idBuffer[0];
    this.widgetMap.set(idBuffer[0], menuItem.widgetParams);
  }

  addWidget(widgetContainerRef: ViewContainerRef, widgetParams: IWidgetParams): void {
    widgetContainerRef.clear();
    const widgetFactory = this.getComponentFactory(widgetParams.widgetName);
    const componentRef = widgetContainerRef.createComponent(widgetFactory);

    this.widgetMap.set(widgetParams.id, widgetParams);
    widgetParams.element = componentRef.location.nativeElement.firstElementChild;

    const widget = componentRef.instance as IWidgetComponent;
    widget.columnWidth = this.packerySizes[widgetParams.size];
    widget.destroy = () => {
      this.widgetMap.delete(widgetParams.id);
      this.packeryDirective.onItemRemove(widgetParams.element);
    }
    if (widgetParams.dataParams) {
      widget.data = this.getData(widgetParams.dataParams);
    }

    componentRef.changeDetectorRef.detectChanges();
  }

  private loadWidgets(userWidgets: IWidgetParams[]): void {
    const positionParams: IPositionParam[] = [];
    this.packerySizes = this.packeryDirective.getPackyerColmunWidths(this.dashboard, userWidgets.length);
    this.widgetViewContainers.forEach((viewContainerRef: ViewContainerRef, index: number, viewContainers: ViewContainerRef[]) => {
      const userWidget = userWidgets[index];
      this.addWidget(viewContainerRef, userWidget);
    })
  }

  private getComponentFactory(widgetComponentKey: string) {
    if (!this.widgetComponentFactories[widgetComponentKey]) {
      const component = WidgetModule.WidgetComponentTypes[widgetComponentKey];
      this.widgetComponentFactories[widgetComponentKey] = this.componentFactoryResolver.resolveComponentFactory(component);
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

  private getUserWidgets(): IWidgetParams[] {
    const ids = this.getRandomIds(4);
    return [
      {
        id: ids[0], widgetName: WidgetModule.WIDGET_KEYS.NOTE,
        dataParams: null, position: { x: 0, y: 0 }, element: null, size: 'singleSize'
      },
      {
        id: ids[1], widgetName: WidgetModule.WIDGET_KEYS.CHAT,
        dataParams: null, position: { x: 0, y: 419 }, element: null, size: 'doubleSize'
      },
      {
        id: ids[2], widgetName: WidgetModule.WIDGET_KEYS.CHART,
        dataParams: true, position: { x: 355, y: 0 }, element: null, size: 'singleSize'
      },
      {
        id: ids[3], widgetName: WidgetModule.WIDGET_KEYS.GRAPHIC,
        dataParams: true, position: { x: 355, y: 419 }, element: null, size: 'doubleSize'
      }
    ];
  }

  private getRandomIds(size: number): Uint32Array {
    const buffer = new Uint32Array(size);
    crypto.getRandomValues(buffer);
    return buffer;
  }

  private onPositionsChanged(items: any[]) {
    items.forEach((item) => {
      const iterator = this.widgetMap.values();
      const iterable = iterator.next();
      let found = false;
      while (found === false && iterable.done === false) {
        if (iterable.value.element === item.element) {
          iterable.value.position.x = item.rect.x;
          iterable.value.position.y = item.rect.y;
          found = true;
        };
      }
    });
  }
}
