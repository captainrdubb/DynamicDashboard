import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

import { IMenuItem } from './shared/interfaces';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  
  title = 'Dynamic Dashboard';
  logo = '../assets/logo.png';
  gravatarUrl = 'https://www.gravatar.com/avatar/36451f5c44ef99ae4d652b790763bfbd?s=100';

  selectedItemId = 1;  
  menuItems = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Dashboard' },
    { id: 3, name: 'Grids/Search' },
    { id: 4, name: 'Messaging' },
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
