import { Injectable, EventEmitter, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaysubject';
import * as Draggabilly from 'draggabilly';
import * as Packery from 'packery';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
@Injectable()
export class EventBusService {

  constructor() { }

  private _onDraggabillyInitialized: ReplaySubject<Draggabilly> = new ReplaySubject();
  private _afterPackeryLayout: Subject<Packery> = new Subject();

  onDraggabillyInitialized(draggabilly: Draggabilly) {
    this._onDraggabillyInitialized.next(draggabilly);
  }

  getDraggabillyInstance(): ReplaySubject<Draggabilly> {
    return this._onDraggabillyInitialized;
  }

  onPackeryItemPositioned(packeryItems: any[]) {
    this._afterPackeryLayout.next(packeryItems);
  }

  getPackeryItemPosition(): Observable<Packery> {
    return this._afterPackeryLayout;
  }
}
