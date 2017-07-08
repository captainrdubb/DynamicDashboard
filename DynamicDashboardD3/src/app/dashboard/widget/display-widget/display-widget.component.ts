import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { EventBusService } from 'app/core/event-bus.service';
import { DraggabillyDirective } from '../../../shared/draggabilly.directive';

@Component({
  selector: 'dd-display-widget',
  templateUrl: './display-widget.component.html',
  styleUrls: ['./display-widget.component.scss']
})
export class DisplayWidgetComponent implements AfterViewInit {

  constructor(private eventBusService: EventBusService) { }

  widgetId = 2;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngAfterViewInit(): void {
    this.eventBusService.onDragItemReady(this.widgetId);
    this.draggabillyDirective.onItemsReady('.dashboard');
  }
}
