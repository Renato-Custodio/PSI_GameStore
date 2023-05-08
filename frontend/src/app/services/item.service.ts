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

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`/api/item/list`);
  }

}
