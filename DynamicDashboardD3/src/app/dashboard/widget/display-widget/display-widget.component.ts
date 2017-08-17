import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';
import { IWidgetComponent } from "app/shared/interfaces";

@Component({
  selector: 'dd-display-widget',
  templateUrl: './display-widget.component.html',
  styleUrls: ['./display-widget.component.scss']
})
export class DisplayWidgetComponent implements AfterViewInit, IWidgetComponent {
  
  chartType: string;
  data: string[][];
  columnWidth: number;
  editMode = false;

  constructor() { }
  
  @Input() displayHeader;

  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;  

  ngAfterViewInit(): void {    
    this.draggabillyDirective.onItemsReady('.dashboard');
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
    if(this.editMode){
      this.draggabillyDirective.disable();
    }else{
      this.draggabillyDirective.enable();
    }
  }
}
