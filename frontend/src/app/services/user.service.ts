import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getLists(username:string):Observable<any[]>{
    return this.http.get<any[]>(`/api/user/`+username+"/lists");
  }

  getGames(username:string): Observable<any>{
    return this.http.get<any[]>(`/api/user/`+username+"/games");
  }

  getFollowers(username:string): Observable<any>{
    return this.http.get<any[]>(`/api/user/`+username+"/followers");
  }

  getFollowing(username:string): Observable<any>{
    return this.http.get<any[]>(`/api/user/`+username+"/following");
  }
}
