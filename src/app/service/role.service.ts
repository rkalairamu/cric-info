import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AppSettings} from '../app.setting';

import {Role} from './role';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = AppSettings.API_ENDPOINT + 'role';  // URL for the web api

  constructor(private http: HttpClient) {
  }

  /**
   * GET roles using API
   * @returns {Observable<Role[]>}
   */
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url)
      .pipe(
        tap(roles => console.log('Roles fetched' + roles)),
        catchError(this.handleError('getRoles', []))
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
