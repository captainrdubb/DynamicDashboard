import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';

@Component({
  selector: 'dd-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements AfterViewInit {

  constructor() {}

  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngAfterViewInit(): void {
    this.draggabillyDirective.onItemsReady('.dashboard');
  }  
}
