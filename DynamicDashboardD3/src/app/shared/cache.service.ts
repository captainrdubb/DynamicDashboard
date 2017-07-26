import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  constructor() { }  

  saveSettings(settings:any){
    localStorage.setItem('user-settings', settings);
  }

  getSettings(){
    return JSON.parse(localStorage.getItem('user-settings'));
  }
}
