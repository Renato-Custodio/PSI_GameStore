import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: string | undefined;

  constructor(private http: HttpClient) {}


  authenticateUser(username: string, password: string): Observable<User> {
    this.user = username;
    return this.http.post<User>(`/api/auth/login`, { username, password });
  }

  registerUser(username: string, password: string): Observable<User> {
    this.user = username;
    return this.http.post<User>(`/api/auth/register`, { username, password });
  }
}
