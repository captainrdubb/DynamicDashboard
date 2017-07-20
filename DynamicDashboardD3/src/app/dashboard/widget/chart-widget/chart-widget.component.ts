import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
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
export class ChartWidgetComponent implements AfterViewInit {

  constructor(private censusDataService: CensusDataService, private d3Service: D3Service) { }

  chartHeader = "Languages in Nebraska"
  @ViewChild('chartWidget') chartWidget: ElementRef;
  @ViewChild(DraggabillyDirective) draggabillyDirective: DraggabillyDirective;

  ngAfterViewInit(): void {
    // this.censusDataService.getLanguageData().subscribe((response: Response) => {
    //   let data = response.json();      
    //   data.shift();
    //   this.d3Service.createPieChart(this.chartWidget, data, 2, 2);
    // });
    let data = [["LANLABEL", "LAN", "EST", "state"],
    ["German", "607", "5690", "31"],
    ["Dutch", "610", "335", "31"],
    ["Swedish", "614", "220", "31"],
    ["Danish", "615", "130", "31"],
    ["French", "620", "4755", "31"],
    ["Spanish", "625", "119505", "31"],
    ["Portuguese", "629", "790", "31"],
    ["Romanian", "631", "130", "31"],
    ["Irish Gaelic", "635", "115", "31"],
    ["Ukrainian", "641", "620", "31"],
    ["Czech", "642", "1770", "31"],
    ["Serbocroatian", "649", "265", "31"],
    ["Croatian", "650", "245", "31"],
    ["Lithuanian", "653", "220", "31"],
    ["Kurdish", "658", "955", "31"],
    ["Bengali", "664", "520", "31"],
    ["Panjabi", "665", "225", "31"],
    ["Marathi", "666", "195", "31"],
    ["Nepali", "674", "1110", "31"],
    ["Sinhalese", "677", "145", "31"],
    ["Turkish", "691", "360", "31"],
    ["Telugu", "701", "1055", "31"],
    ["Malayalam", "703", "125", "31"],
    ["Tamil", "704", "770", "31"],
    ["Chinese", "708", "3575", "31"],
    ["Mandarin", "712", "640", "31"],
    ["Tibetan", "716", "175", "31"],
    ["Burmese", "717", "440", "31"],
    ["Karen", "718", "1550", "31"],
    ["Indonesian", "732", "245", "31"],
    ["Bisayan", "743", "155", "31"],
    ["Marshallese", "755", "160", "31"],
    ["Samoan", "767", "100", "31"],
    ["Amharic", "780", "355", "31"],
    ["Cushite", "783", "1965", "31"],
    ["Sudanic", "784", "740", "31"],
    ["Nilotic", "785", "1670", "31"],
    ["Nubian", "787", "110", "31"],
    ["Swahili", "791", "145", "31"],
    ["Bantu", "792", "275", "31"],
    ["Mande", "793", "240", "31"],
    ["Kru, Ibo, Yoruba", "796", "385", "31"],
    ["Dakota", "907", "565", "31"],
    ["Winnebago", "909", "225", "31"],
    ["Omaha", "911", "300", "31"],
    ["Mayan languages", "968", "565", "31"]];
    data.shift();
    this.d3Service.createPieChart(this.chartWidget, data, 2, 2);
    this.draggabillyDirective.onItemsReady('.dashboard');
  }
}
