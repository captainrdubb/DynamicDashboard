import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { INavItem } from './shared/interfaces';
import { WindowDataService } from './core/window-data.service';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Dynamic Dashboard';
  logo = '../assets/logo.png';
  gravatarUrl = 'https://www.gravatar.com/avatar/d170836be1651dc272276351bb49878d?s=100';
  hamburgerMenuClicked = false;
  windowHeightSubscription: Subscription;
  windowHeight = 0;
  appHeaderHeight = 100;
  appBodyHeight: number;
  selectedItemId:number;
  navItems = [
    { id: 1, name: 'Home', path: 'home' },
    { id: 2, name: 'Dashboard', path: 'dashboard' },
    { id: 3, name: 'Grids/Search', path: 'grid' },
    { id: 4, name: 'Messaging', path: 'messaging' },
  ];

  constructor(private windowDataService: WindowDataService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.selectNavItemFromRoute(event);
      }
    });
    this.onWindowHeightUpdate(this.windowDataService.getWindowHeight());
    this.windowHeightSubscription = this.windowDataService.getWindowHeightUpdates().subscribe((height) => {
      this.onWindowHeightUpdate(height);
    })
  }

  selectNavItemFromRoute(event:NavigationEnd){
    this.navItems.forEach((item:INavItem)=>{
      if(event.url === `/${item.path}`){
        this.selectedItemId = item.id;        
      }
    });
    if(!this.selectedItemId){
      this.selectedItemId = 1;
    }
  }

  ngOnDestroy(): void {
    this.windowHeightSubscription.unsubscribe();
  }

  isSelectedNavItem(id: number) {
    return this.selectedItemId === id;
  }

  selectNavItem(id: number) {
    this.selectedItemId = id;
    if (this.hamburgerMenuClicked) {
      this.hamburgerMenuClicked = !this.hamburgerMenuClicked;
    }
  }

  onWindowHeightUpdate(windowHeight: number) {
    this.windowHeight = windowHeight;
    this.appBodyHeight = windowHeight - this.appHeaderHeight;
  }
}
