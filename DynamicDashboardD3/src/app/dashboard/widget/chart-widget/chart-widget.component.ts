import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, Renderer } from '@angular/core';
import { Response } from '@angular/http';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';
import { CensusDataService } from '../../../core/census-data.service';
import { D3PieFactoryService } from '../../../core/d3-pie-factory.service';
import { IWidgetComponent } from "app/shared/interfaces";

@Component({
  selector: 'dd-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChartWidgetComponent implements AfterViewInit, IWidgetComponent {

  constructor(private d3PieFactory: D3PieFactoryService, private renderer: Renderer) { }

  width: number;
  data: string[][];  
  selectedPath: EventTarget;    
  chartHeader = "Languages in Nebraska";
  @ViewChild('chartWidget') chartWidget: ElementRef;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective; 

  ngAfterViewInit(): void {    
    this.d3PieFactory.createPieChart(this.chartWidget, this.data, 2, 0, (path:any, event:Event) => {
      if (this.selectedPath) {
        this.renderer.setElementClass(this.selectedPath, "selected", false);
      }
      this.renderer.setElementClass(event.target, "selected", true);
      this.selectedPath = event.target;
    });
    this.draggabillyDirective.onItemsReady('.dashboard');
  }
}