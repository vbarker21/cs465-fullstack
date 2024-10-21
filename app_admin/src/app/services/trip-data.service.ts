import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trips';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) { }

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}
