import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { INavItem } from './shared/interfaces';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  title = 'J. Rainear Wills';
  logo = '../assets/logo.png';
  gravatarUrl = 'https://www.gravatar.com/avatar/d170836be1651dc272276351bb49878d?s=70';
  hamburgerMenuClicked = false;
  selectedNavItem: INavItem;
  navItems = [
    { id: 1, name: 'Home', path: 'home' },
    { id: 2, name: 'Dashboard', path: 'dashboard' },
    { id: 3, name: 'Grids/Search', path: 'grid' },
    { id: 4, name: 'Messaging', path: 'messaging' },
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectNavItemFromRoute(event);
      }
    });
  } 
  
  selectNavItemFromRoute(event: NavigationEnd) {
    this.navItems.forEach((item: INavItem) => {
      if (event.url === `/${item.path}`) {
        this.selectedNavItem = item;
      }
    });
    if (!this.selectedNavItem) {
      this.selectedNavItem = this.navItems[0];
    }
  }

  isSelectedNavItem(id: number) {
    return this.selectedNavItem.id === id;
  }

  selectNavItem(navItem: INavItem) {
    this.selectedNavItem = navItem;
    if (this.hamburgerMenuClicked) {
      this.hamburgerMenuClicked = !this.hamburgerMenuClicked;
    }
  }  
}
