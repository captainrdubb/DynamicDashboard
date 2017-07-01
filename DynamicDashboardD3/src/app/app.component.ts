import { Component, AfterViewInit } from '@angular/core';

import { IMenuItem } from './shared/interfaces';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  title = 'Dynamic Dashboard';
  logo = '../assets/logo.png';
  
  selectedItemId = -1;  
  menuItems = [
    { id: 1, name: 'Dashboard' },
    { id: 2, name: 'Human Resources' },
    { id: 3, name: 'Messaging' },
  ];

  constructor(){}

  isSelected(id:number){
    return this.selectedItemId === id;
  }

  selectItem(id: number){
    this.selectedItemId = id;
  }
  
  ngAfterViewInit(): void {}
}
