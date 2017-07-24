import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';
import { IColumnWidth } from '../../../shared/interfaces';

@Component({
  selector: 'dd-display-widget',
  templateUrl: './display-widget.component.html',
  styleUrls: ['./display-widget.component.scss']
})
export class DisplayWidgetComponent implements OnInit, AfterViewInit, IColumnWidth {
  
  defaultWidth: number;
  width: number;
  editMode = false;

  constructor() { }
  
  @Input() displayHeader;

  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngOnInit(){
    this.width = this.defaultWidth;
  }

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
