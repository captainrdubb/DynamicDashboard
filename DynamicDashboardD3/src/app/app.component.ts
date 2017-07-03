import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

import { WindowDataService } from './shared/window-data.service';
import { IMenuItem } from './shared/interfaces';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Dynamic Dashboard';
  logo = '../assets/logo.png';
  gravatarUrl = 'https://www.gravatar.com/avatar/36451f5c44ef99ae4d652b790763bfbd?s=100';
  hamburgerMenuClicked = false;
  windowHeight = 0;
  appHeaderHeight = 100;
  appBodyHeight:number;
  windowHeightSubscription: Subscription;

  selectedItemId = 1;
  menuItems = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Dashboard' },
    { id: 3, name: 'Grids/Search' },
    { id: 4, name: 'Messaging' },
  ];

  constructor(private windowDataService: WindowDataService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.onWindowHeightUpdate(this.windowDataService.getWindowHeight());
    this.windowHeightSubscription = this.windowDataService.getWindowHeightUpdates().subscribe((height) => {
      this.onWindowHeightUpdate(height);
    })
  }

  ngOnDestroy(): void {
    this.windowHeightSubscription.unsubscribe();
  }

  isSelected(id: number) {
    return this.selectedItemId === id;
  }

  selectItem(id: number) {
    this.selectedItemId = id;
  }  

  onWindowHeightUpdate(windowHeight: number) {    
    this.windowHeight = windowHeight;
    this.appBodyHeight = windowHeight - this.appHeaderHeight;
  }
}
