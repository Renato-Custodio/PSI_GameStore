import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticateUser(username: string, password: string): Observable<User> {
    return this.http.post<User>(`http://localhost:3000/api/login`, {username , password});
  }
}
