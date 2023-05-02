import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticateUser(username: string, password: string): Observable<User> {
    return this.http.post<User>(`/api/auth/login`, { username, password });
  }

  registerUser(username: string, password: string): Observable<User> {
    return this.http.post<User>(`/api/auth/register`, { username, password });
  }
}
