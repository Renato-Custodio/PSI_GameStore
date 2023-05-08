import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Item } from '../types/item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  allGames: Item[] = []; // new array to store all the games in the database
  searchResults: Item[] = [];
  errorMessage: string = '';

  constructor(private searchService: SearchService) {
    this.searchService.getAllGames().subscribe((games) => {
      this.allGames = games;
    });
  }

  searchGame(title: string): void {
    title = title.trim();
    if (title.length < 3) {
      // if query is empty or less than 3 characters, show all games
      this.searchResults = this.allGames;
      return;
    }
    this.searchResults = this.allGames.filter(
      (game) =>
        game.name.toLowerCase().indexOf(title.toLowerCase()) !== -1 // filter the games based on the query
    );
    if (this.searchResults.length === 0) {
      this.errorMessage = 'Nao foi encontrado nenhum jogo';
    } else {
      this.errorMessage = '';
    }
  }

  clearSearchResults(): void {
    this.searchResults = this.allGames;
    this.errorMessage = '';
    this.query = '';
  }
}
