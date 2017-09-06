import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/observable'

@Injectable()
export class CensusDataService {

  constructor(private http: Http) { }

  getLanguageData(): Observable<Response> {
    return this.http.get('http://api.census.gov/data/2013/language?get=LANLABEL,LAN&for=STATE:31&EST=1000:10000000&key=cb0109e510e6b439f82e425080d7826c07f79777');
  }

  getPopulationEstimatesData(): Observable<Response> {
    return this.http.get('http://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=state:*&DATE=7:9&key=cb0109e510e6b439f82e425080d7826c07f79777');
  }
}
