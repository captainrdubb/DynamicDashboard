import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';

@Component({
  selector: 'dd-display-widget',
  templateUrl: './display-widget.component.html',
  styleUrls: ['./display-widget.component.scss']
})
export class DisplayWidgetComponent implements AfterViewInit {
  
  width: number;
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
