import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Injectable()
export class D3StackedBarFactoryService {

  constructor() { }

  createBarChart(svg: ElementRef, datumIndex: number, labels:string[], data1: string[][], data2:string[][]) {
    let xValues = d3.range(labels);

    let y1Values = d3.range(data1).map((d) => {
        return d[datumIndex];
    });

    let y2Values = d3.range(data2).map((d) => {
        return d[datumIndex];
    });
    // let yValues: { [key: number]: any };
    // data.forEach((subset, index) => {
    //   yValues[index] = d3.range(data).map((d) => {
    //     return d[datumIndex];
    //   });
    // })
  }
}
