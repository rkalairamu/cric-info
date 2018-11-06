import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AppSettings} from '../app.setting';

import {Country} from './country';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url = AppSettings.API_ENDPOINT + 'country';  // URL for the web api

  constructor(private http: HttpClient) {
  }

  /**
   * GET countries using API
   * @returns {Observable<Country[]>}
   */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url)
      .pipe(
        tap(roles => console.log('Country fetched' + roles)),
        catchError(this.handleError('getCountries', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
