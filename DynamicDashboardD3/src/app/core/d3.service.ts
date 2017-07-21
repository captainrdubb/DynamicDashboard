import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Injectable()
export class D3Service {

  constructor() { }

  createPieChart(svg: ElementRef, data: string[][], datumIndex: number, labelIndex: number, selectionCallback: (path: any, $event: Event) => void): void {
    var chartWidth = +(svg.nativeElement.clientWidth);
    var chartHeight = +(svg.nativeElement.clientHeight);
    var radius = Math.min(chartWidth, chartHeight) / 2 - 3;

    let d3Svg = d3.select(svg.nativeElement);

    let createGroup = (chartWidth, chartHeight) => {
      var group = d3Svg.append("g");
      group.attr("transform", "translate(" + (chartWidth / 2) + ',' + (chartHeight / 2) + ')')
      return group;
    }

    let createText = (group: any) => {
      let text = group.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "white");
      return text;
    }

    let createArc = (radius) => {
      let arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - (radius / 3));
      return arc;
    }
    
    var min = d3.min(data, (data) => {
      return +data[datumIndex];
    });

    var max = d3.max(data, (data) => {
      return +data[datumIndex];
    });

    let group = createGroup(chartWidth, chartHeight);
    let text = createText(group);
    var arc = createArc(radius);
    
    var color = d3.scaleSequential(d3Chromatic.interpolateSpectral).domain([0, data.length - 1]);

    var dataScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, 100]);

    var pie = d3.pie();
    pie.sort((a, b) => {
      return a[labelIndex].localeCompare(b[labelIndex]);
    });
    pie.value((data) => {
      return dataScale(+data[datumIndex]);
    });

    let format = d3.format(",");
    var path = group.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .on("click", (path: any) => {
        let oldSpans = text.selectAll("tspan");
        oldSpans.exit();
        oldSpans.remove();

        let labelSpan = text
          .append("tspan")
          .text(path.data[labelIndex])
          .attr("x", "0")
          .attr("dy", "-.5em");

        let datumSpan = text
          .append("tspan")
          .text(format(+path.data[datumIndex]))
          .attr("x", "0")
          .attr("dy", "1.25em");

        selectionCallback(path, d3.event);
      })
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", function (d, i) {
        let paint = color(i);
        return paint;
      });
  }
}