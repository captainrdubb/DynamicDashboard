import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';

@Component({
  selector: 'dd-display-widget',
  templateUrl: './display-widget.component.html',
  styleUrls: ['./display-widget.component.scss']
})
export class DisplayWidgetComponent implements AfterViewInit {

  constructor() { }
  
  @Input() displayHeader;

  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngAfterViewInit(): void {
    this.draggabillyDirective.onItemsReady('.dashboard');
  }
}
