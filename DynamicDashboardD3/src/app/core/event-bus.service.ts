import { Injectable, EventEmitter, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaysubject';
import * as Draggabilly from 'draggabilly';
@Injectable()
export class EventBusService {

  constructor() { }

  private _onDraggabillyInitialized: ReplaySubject<Draggabilly> = new ReplaySubject();

  onDraggabillyInitialized(draggabilly: Draggabilly) {
    this._onDraggabillyInitialized.next(draggabilly);
  }

  getDraggabillyInstance(): ReplaySubject<Draggabilly> {
    return this._onDraggabillyInitialized;
  }
}
