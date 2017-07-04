import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  widgets = [
    { id: 1 },    
    { id: 2 },
  ];

}
