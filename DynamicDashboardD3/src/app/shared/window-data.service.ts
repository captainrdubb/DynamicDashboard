import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';

@Injectable()
export class WindowDataService {
  
  private resizeObservable: Observable<number>;

  private _window = window;

  constructor() { 
    this.resizeObservable = fromEvent(window, 'resize');
  }

  getWindowHeight():number{
    return window.innerHeight;
  }
  getWindowHeightUpdates(): Observable<number> {
    return this.resizeObservable.map((event:any)=>{
      return event.target.innerHeight;
    });
  }
}
