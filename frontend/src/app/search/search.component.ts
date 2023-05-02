import { Component } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  searchResults: { title: string; year: string }[] = [];

  constructor(private searchService: SearchService) {}

  onSubmit() {
    this.searchService
      .searchGames(this.query)
      .subscribe((searchResults) => (this.searchResults = searchResults));
  }
}
