import { Injectable, EventEmitter, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaysubject';

@Injectable()
export class EventBusService {

  constructor() { }

  private _onDragItemReady: ReplaySubject<number> = new ReplaySubject();

  subscribeOnDragItemReady(): ReplaySubject<number> {
    return this._onDragItemReady;
  }

  onDragItemReady(itemId: number) {
    this._onDragItemReady.next(itemId);
  }
}
