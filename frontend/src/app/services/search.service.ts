import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchGames(title: string): Observable<[]> {
    if (!title.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<[]>(`/api/item/search?title=${title}`);
  }
}
