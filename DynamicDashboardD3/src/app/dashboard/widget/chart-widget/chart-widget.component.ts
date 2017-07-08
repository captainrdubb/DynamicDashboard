import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { EventBusService } from 'app/core/event-bus.service';
import { DraggabillyDirective } from '../../../shared/draggabilly.directive';

@Component({
  selector: 'dd-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements AfterViewInit {

  constructor(private eventBusService: EventBusService) { }

  widgetId = 1;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngAfterViewInit(): void {
    this.eventBusService.onDragItemReady(this.widgetId);
    this.draggabillyDirective.onItemsReady('.dashboard');
  }
}
