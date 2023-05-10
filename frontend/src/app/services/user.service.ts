import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { List, UserData } from '../types/user';
import { Item } from '../types/item';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserCartLength(username: string) {
    return this.http.get<number>(`/api/user/${username}/cart/length`);
  }

  cartChanged = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  getLists(username: string): Observable<number[]> {
    return this.http.get<number[]>(`/api/user/` + username + '/lists');
  }

  getGames(username: string): Observable<number[]> {
    return this.http.get<number[]>(`/api/user/` + username + '/games');
  }

  getFollowers(username: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/user/` + username + '/followers');
  }

  getFollowing(username: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/user/` + username + '/following');
  }

  getUserData(username: string): Observable<UserData> {
    return this.http.get<UserData>(`/api/user/` + username + '/data');
  }

  addToCart(username: string, gameID: string): Observable<any> {
    return this.http.put(`/api/user/${username}/cart/${gameID}`, {}).pipe(
      tap(() => {
        this.cartChanged.emit();
      })
    );
  }

  // getUserAvatar(username: string): Observable<string> {
  //   return this.http.get<string>(`/api/user/` + username + '/avatar');
  // }
}
