import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { ItemData, List, UserData } from '../types/user';
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

  // getGames(username: string): Observable<number[]> {
  //   return this.http.get<number[]>(`/api/user/` + username + '/games');
  // }

  getFollowers(username: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/user/` + username + '/followers');
  }

  getFollowing(username: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/user/` + username + '/following');
  }

  getUserData(username: string): Observable<UserData> {
    return this.http.get<UserData>(`/api/user/` + username + '/data');
  }

  addToCart(username: string, gameID: number): Observable<any> {
    return this.http.put(`/api/user/${username}/cart/add/${gameID}`, {}).pipe(
      tap(() => {
        this.cartChanged.emit();
      })
    );
  }

  removeFromCart(username: string, itemId: number): Observable<any> {
    return this.http.delete(`/api/user/${username}/cart/remove/${itemId}`).pipe(
      tap(() => {
        this.cartChanged.emit();
      })
    );
  }

  removeAllFromCart(username: string, itemId: number): Observable<any> {
    return this.http
      .delete(`/api/user/${username}/cart/removeall/${itemId}`)
      .pipe(
        tap(() => {
          this.cartChanged.emit();
        })
      );
  }

  addToWishlist(username: string, gameID: number): Observable<any> {
    return this.http.put(`/api/user/${username}/wishlist/${gameID}`, {});
  }

  getDisplayName(username: string): Observable<string> {
    return this.http.get<string>(`/api/user/displayname/${username}`);
  }

  getUserAvatar(username: string): Observable<string> {
    return this.http.get<string>(`/api/user/avatar/${username}`);
  }
      
  removeFromWishlist(username: string, gameID: number): Observable<any> {
    return this.http.delete(`/api/user/${username}/wishlist/${gameID}`, {});
  }

  getItems(username: string): Observable<ItemData[]> {
    return this.http.get<ItemData[]>(`/api/user/items/` + username);
  }

  updateUser(
    displayName: string,
    avatar: string
  ): Observable<{ error: string } & { ok: string }> {
    return this.http.put<{ error: string } & { ok: string }>(
      `/api/user/update`,
      { displayName, avatar }
    );
  }
}
