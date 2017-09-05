import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  static KEYS = {
    WIDGET_PARAMS: 'widgetParams'
  }

  constructor() { }

  cacheItem(key: string, item: any) {
    localStorage.setItem(key, item);
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
