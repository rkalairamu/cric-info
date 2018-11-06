import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {AppSettings} from '../app.setting';

import {Player} from './player';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// const FILE_UPLOAD_URL = 'http://localhost:4200/assets/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url = AppSettings.API_ENDPOINT + 'player';  // URL for the web api

  constructor(private http: HttpClient) {
  }

  /**
   * GET players using API
   * @returns {Observable<Player[]>}
   */
  getPlayers(page: number = 1, count: number = 10, sort?: string): Observable<Player[]> {
    let param = '_page=' + page + '&_limit=' + count;
    if (sort) {
      param += '&_sort=' + sort;
    }
    return this.http.get<Player[]>(this.url + '?' + param)
      .pipe(
        tap(players => console.log('Players fetched' + players)),
        catchError(this.handleError('getPlayers', []))
      );
  }

  /**
   * GET a player using API
   * @returns {Observable<Player>}
   */
  getPlayer(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + id)
      .pipe(
        tap(player => console.log('Player fetched' + player)),
        catchError(this.handleError('getPlayer', []))
      );
  }

  /**
   * Check the player using API
   * @returns {Observable<Player>}
   */
  checkPlayer(newPlayer: Player): Observable<any> {
    const param = '?name=' + newPlayer.name + '&country_id=' + newPlayer.country_id + '&role_id=' + newPlayer.role_id;
    return this.http.get<any>(this.url + param)
      .pipe(
        tap(player => console.log('Player fetched' + player)),
        catchError(this.handleError('getPlayer', []))
      );
  }

  /**
   * Create the player using API
   * @returns {Observable<Player[]>}
   */
  createPlayer(player: Player): Observable<any> {
    return this.http.post<any>(this.url, player)
      .pipe(
        tap(newPlayer => console.log('Player created' + newPlayer)),
        catchError(this.handleError('createPlayer', []))
      );
  }

  /**
   * Update the player using API
   * @returns {Observable<Player[]>}
   */
  updatePlayer(id: number, player: Player): Observable<any> {
    return this.http.put<any>(this.url + '/' + id, player)
      .pipe(
        tap(updatedPlayer => console.log('Player updated' + updatedPlayer)),
        catchError(this.handleError('updatePlayer', []))
      );
  }

  /**
   * Delete players using API
   * @returns {Observable<Player[]>}
   */
  deletePlayer(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id)
      .pipe(
        tap(player => console.log('Player updated' + player)),
        catchError(this.handleError('updatePlayer', []))
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
