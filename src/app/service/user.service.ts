import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AppSettings} from '../app.setting';

import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = AppSettings.API_ENDPOINT + 'user';  // URL for the web api
  private user: {
    name: string,
    permission: {
      read: boolean,
      write: boolean
    }
  };

  constructor(private http: HttpClient) {
  }

  getloginDefault() {
    return {
      name: '',
      permission: {
        read: false,
        write: false
      }
    };
  }

  /**
   * GET user using API
   * @returns {Observable<Player>}
   */
  checkUser(name: string, password: string): Observable<any> {
    const param = '?name=' + name + '&password=' + password;
    return this.http.get<any>(this.url + param)
      .pipe(
        tap(user => console.log('User fetched' + user)),
        catchError(this.handleError('getUser', []))
      );
  }

  /**
   *
   * sets the logged-in user information in session
   * @returns {{name: string; permission: {read: boolean; write: boolean}}}
   */
  setLoginUser(user: any) {
    this.user.permission.read = user.length > 0;
    if (this.user.permission.read) {
      this.user.name = user[0].name;
      if (user[0].group_id === 1) {
        this.user.permission.write = true;
      }
      sessionStorage.setItem('user', JSON.stringify(this.user));
    }
    return this.user;
  }

  /**
   * gets the logged-in user information
   * @returns {{name: string; permission: {read: boolean; write: boolean}}}
   */
  getLoginUser() {
    const user = sessionStorage.getItem('user');
    this.user = JSON.parse(user) || this.getloginDefault();
    return this.user;
  }

  /**
   * true if the user is admin. Otherwise normal user
   * @returns {boolean}
   */
  isAdmin() {
    return this.user && this.user.permission && this.user.permission.write;
  }

  /**
   * logout from the system
   * @returns {{name: string; permission: {read: boolean; write: boolean}}}
   */
  logout() {
    sessionStorage.removeItem('user');
    this.user = this.getloginDefault();
    return this.user;
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
