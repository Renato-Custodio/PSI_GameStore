import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List, UserData } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getLists(username: string): Observable<List[]> {
    return this.http.get<List[]>(`/api/user/` + username + '/lists');
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

  // getUserAvatar(username: string): Observable<string> {
  //   return this.http.get<string>(`/api/user/` + username + '/avatar');
  // }
}
