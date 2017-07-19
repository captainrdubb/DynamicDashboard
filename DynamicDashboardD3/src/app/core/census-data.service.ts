import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/observable'
import 'rxjs/add/observable/of';

@Injectable()
export class CensusDataService {

  constructor(private http: Http) { }

  getLanguageData(): Observable<Response> {
    // return this.http.get('http://api.census.gov/data/2013/language?get=LANLABEL,NAME&for=STATE:*&LAN=708&EST=100000:1000000');
    return this.http.get('http://api.census.gov/data/2013/language?get=LANLABEL,LAN&for=STATE:31&EST=500:10000000&key=cb0109e510e6b439f82e425080d7826c07f79777');
  }
}
