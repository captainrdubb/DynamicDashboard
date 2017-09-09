import {
  Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ViewContainerRef,
  ComponentFactoryResolver, ComponentFactory, ElementRef, Type, AfterViewChecked, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { element } from 'protractor';
import { EventBusService } from './../core/event-bus.service';
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
  layoutSubscription: Subscription;
  packerySizes: IPackerySizes;
  newWidgetId: number;
  userWidgets: IWidgetParams[];

  menuItems = [
    { display: 'Indicator', widgetParams: { position: { x: 0, y: 0 }, widgetName: WidgetModule.WIDGET_KEYS.GRAPHIC, dataParams: null, size: PackeryDirective.PACKERY_SIZES.DOUBLE_WIDTH } },
    { display: 'Messanger', widgetParams: { position: { x: 0, y: 0 }, widgetName: WidgetModule.WIDGET_KEYS.CHAT, dataParams: null, size: PackeryDirective.PACKERY_SIZES.DOUBLE_WIDTH } },
    { display: 'Note', widgetParams: { position: { x: 0, y: 0 }, widgetName: WidgetModule.WIDGET_KEYS.NOTE, dataParams: null, size: PackeryDirective.PACKERY_SIZES.SINGLE_WIDTH } },
    { display: 'Pie Chart', widgetParams: { position: { x: 0, y: 0 }, widgetName: WidgetModule.WIDGET_KEYS.CHART, dataParams: true, size: PackeryDirective.PACKERY_SIZES.SINGLE_WIDTH } }
  ]

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver, private eventBus: EventBusService) { }

  ngOnInit() {
    this.userWidgets = this.getUserWidgets();
    let layoutSubscription = this.packeryDirective.subscribeToItemsLayout().subscribe((packeryItems) => {
      packeryItems.forEach((item: any) => {
        for (let i = 0; i < this.userWidgets.length; ++i) {
          if (this.userWidgets[i].element === item.element) {
            this.userWidgets[i].position.x = item.rect.x;
            this.userWidgets[i].position.y = item.rect.y;
          }
        }
      })
    });
  }

  ngAfterViewInit(): void {
    this.loadWidgets(this.userWidgets);
    const positionParams = this.userWidgets.map((userWidget: IWidgetParams) => {
      return { element: userWidget.element, position: userWidget.position }
    });

    this.packeryDirective.onItemsReady('.widget', this.packerySizes.singleWidth, positionParams);
  }

  ngAfterViewChecked(): void {
    if (this.newWidgetId) {
      const widgetParams = this.userWidgets[this.userWidgets.length - 1];
      const viewContainerRef = this.widgetViewContainers.last;
      this.addWidget(viewContainerRef, widgetParams);
      this.packeryDirective.onItemAppend(widgetParams.element);
      this.newWidgetId = undefined;
    }
  }

  onMenuItemClicked(menuItem: IWidgetMenuItem) {
    const idBuffer = this.getRandomIds(1);
    this.newWidgetId = idBuffer[0];
    menuItem.widgetParams.id = this.newWidgetId;
    this.userWidgets.push(menuItem.widgetParams);
  }

  addWidget(widgetContainerRef: ViewContainerRef, widgetParams: IWidgetParams): void {
    widgetContainerRef.clear();
    const widgetFactory = this.getComponentFactory(widgetParams.widgetName);
    const componentRef = widgetContainerRef.createComponent(widgetFactory);

    widgetParams.element = componentRef.location.nativeElement.firstElementChild;
    if(this.userWidgets.indexOf(widgetParams) === -1){
      this.userWidgets.push(widgetParams);    
    }

    const index = this.userWidgets.length - 1;
    const widget = componentRef.instance as IWidgetComponent;
    widget.columnWidth = this.packerySizes[widgetParams.size];

    widget.destroy = () => {
      this.userWidgets.slice(index, 1);
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
        dataParams: null, position: { x: 0, y: 0 }, element: null, size: PackeryDirective.PACKERY_SIZES.SINGLE_WIDTH
      },
      {
        id: ids[1], widgetName: WidgetModule.WIDGET_KEYS.CHAT,
        dataParams: null, position: { x: 0, y: 419 }, element: null, size: PackeryDirective.PACKERY_SIZES.DOUBLE_WIDTH
      },
      {
        id: ids[2], widgetName: WidgetModule.WIDGET_KEYS.CHART,
        dataParams: true, position: { x: 355, y: 0 }, element: null, size: PackeryDirective.PACKERY_SIZES.SINGLE_WIDTH
      },
      {
        id: ids[3], widgetName: WidgetModule.WIDGET_KEYS.GRAPHIC,
        dataParams: true, position: { x: 0, y: 419 }, element: null, size: PackeryDirective.PACKERY_SIZES.DOUBLE_WIDTH
      }
    ];
  }

  private getRandomIds(size: number): Uint32Array {
    const buffer = new Uint32Array(size);
    crypto.getRandomValues(buffer);
    return buffer;
  }

  ngOnDestroy() {

  }
}
