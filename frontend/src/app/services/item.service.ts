import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../types/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`/api/item/details/${id}`);
  }

  getItemByName(name: string): Observable<Item> {
    return this.http.get<Item>(`/api/item/details/${name}`);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`/api/item/list`);
  }

  evaluateGame(username: string, itemId: number, stars: number, comment: string): Observable<any> {
    return this.http.put(`/api/item/evaluate/${itemId}`, {username, stars, comment});
  }
}
