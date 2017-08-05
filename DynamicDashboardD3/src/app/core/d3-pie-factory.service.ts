import { Injectable, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Chromatic from 'd3-scale-chromatic';

@Injectable()
export class D3PieFactoryService {

  constructor() { }

  nextTextId = 0;
  textMap: { [key: number]: any[] } = {};
  resetTspanValueTimeout: any;

  createPieChart(svg: ElementRef, data: string[][], datumIndex: number, labelIndex: number, selectionCallback: (path: any, $event: Event) => void): void {
    var chartWidth = +(svg.nativeElement.clientWidth);
    var chartHeight = +(svg.nativeElement.clientHeight);
    var radius = Math.min(chartWidth, chartHeight) / 2 - 3;

    let d3Svg = d3.select(svg.nativeElement);

    var min = d3.min(data, (data) => {
      return +data[datumIndex];
    });

    var max = d3.max(data, (data) => {
      return +data[datumIndex];
    });

    var arc = this.createArc(radius);
    let group = this.addGroup(d3Svg, chartWidth, chartHeight);
    let text = this.addTextToSelection(group);

    this.addTSpans(text);

    var colorScale = d3.scaleSequential(d3Chromatic.interpolateSpectral).domain([0, data.length - 1]);

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

    var path = group.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .on("click", (path) => {
        this.changeTSpanValues(path, text, labelIndex, datumIndex, true);
        selectionCallback(path, d3.event);
      })
      .on("mouseover", (path) => {
        clearTimeout(this.resetTspanValueTimeout);
        this.changeTSpanValues(path, text, labelIndex, datumIndex, false);
      })
      .on("mouseout", () => {
        this.resetTspanValueTimeout = setTimeout(this.resetTspanValues(text), 500);
      })
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", function (d, i) {
        let paint = colorScale(i);
        return paint;
      });
  }

  private addGroup(svg: any, chartWidth: number, chartHeight: number) {
    var group = svg.append("g");
    group.attr("transform", `translate(${chartWidth / 2},${chartHeight / 2})`);
    return group;
  }

  private addTextToSelection(selection: any) {
    let text = selection.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "white")
      .attr("id", `test-${this.nextTextId}`);
    this.textMap[this.nextTextId] = [];
    this.nextTextId++;
    return text;
  }

  private createArc = (radius) => {
    let arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - (radius / 3));
    return arc;
  }

  private addTSpans(text) {
    let label = "Select";
    let value = "Segment";

    text.append("tspan")
      .text(label)
      .attr("x", "0")
      .attr("dy", "-.5em");

    text.append("tspan")
      .text(value)
      .attr("x", "0")
      .attr("dy", "1.25em");

    let textId = text.attr("id");
    this.textMap[textId] = [label, value];      
  }

  private changeTSpanValues(path: any, text: any, labelIndex: number, datumIndex: number, cacheValues: boolean) {
    let tspans = text.selectAll("tspan");
    let textId = text.attr("id");
    let format = d3.format(",");
    let label = path.data[labelIndex];
    let value = format(+path.data[datumIndex]);

    if (cacheValues) {
      this.textMap[textId] = [label, value];
    }

    d3.select(tspans._groups[0][0]).text(label);
    d3.select(tspans._groups[0][1]).text(value);
  }

  private resetTspanValues(text) {
    let service = this;
    let textId = text.attr("id");
    let tspanValues = this.textMap[textId];
    if (tspanValues) {
      let tspans = text.selectAll("tspan");
      d3.select(tspans._groups[0][0]).text(tspanValues[0]);
      d3.select(tspans._groups[0][1]).text(tspanValues[1]);
    } else {
      text.selectAll("tspan")
        .remove();
    }
  }
}