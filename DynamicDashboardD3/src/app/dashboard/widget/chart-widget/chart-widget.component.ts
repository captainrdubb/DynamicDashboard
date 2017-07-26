import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, Renderer } from '@angular/core';
import { Response } from '@angular/http';

import { DraggabillyDirective } from '../../../shared/draggabilly.directive';
import { CensusDataService } from '../../../core/census-data.service';
import { D3Service } from '../../../core/d3.service';

@Component({
  selector: 'dd-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChartWidgetComponent implements OnInit, AfterViewInit {

  constructor(private censusDataService: CensusDataService, private d3Service: D3Service, private renderer: Renderer) { }

  width: number;
  data: string[][];
  defaultWidth: number;  
  selectedPath: EventTarget;    
  chartHeader = "Languages in Nebraska";
  @ViewChild('chartWidget') chartWidget: ElementRef;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngOnInit(){
    this.width = this.width || this.defaultWidth;
  }

  ngAfterViewInit(): void {
    // this.censusDataService.getLanguageData().subscribe((response: Response) => {
    //   let data = response.json();      
    //   data.shift();
    //   this.d3Service.createPieChart(this.chartWidget, data, 2, 2);
    // });
    
    this.d3Service.createPieChart(this.chartWidget, this.data, 2, 0, (path:any, event:Event) => {
      if (this.selectedPath) {
        this.renderer.setElementClass(this.selectedPath, "selected", false);
      }
      this.renderer.setElementClass(event.target, "selected", true);
      this.selectedPath = event.target;
    });
    this.draggabillyDirective.onItemsReady('.dashboard');
  }
}