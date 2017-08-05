import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Injectable()
export class D3StackedBarFactoryService {

  constructor() { }

  createBarChart(svg: ElementRef, datumIndex: number, keys: string[], data1: string[][], data2: string[][]) {
    let container = d3.select(svg.nativeElement);
    let margin = { top: 20, left: 20, bottom: 20, right: 20 };
    let width = +container.attr("width") - margin.left - margin.right;
    let height = +container.attr("height") - margin.top - margin.bottom;
    let group = container.append('g')
      .attr("transform", `translate(${margin.top},${margin.left})`);

    let x = d3.scaleBand()
      .rangeRound([0,width])
      .paddingInner(0.05);

    let y = d3.scaleLinear()
      .rangeRound([height, 0]);

    let z = d3.scaleOrdinal(d3Chromatic.d3.schemeSet1);

    
  

  }
}
