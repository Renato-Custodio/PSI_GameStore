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
      this.searchResults = this.allGames;
    });
  }

  searchGame(title: string): void {
    title = title.trim();
    this.query = title; // Update the query with the current title
    if (title.length === 0) {
      this.searchResults = this.allGames;
      this.errorMessage = '';
      return;
    }
    if (title.length < 1) {
      this.searchResults = [];
      this.errorMessage = '';
      return;
    }
    this.searchResults = this.allGames.filter(
      (game) =>
        game.name.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
    if (this.searchResults.length === 0) {
      this.errorMessage = 'Nao foi encontrado nenhum jogo';
    } else {
      this.errorMessage = '';
    }
    if (this.query === '') {
      this.searchResults = this.allGames;
    }
  }

  clearSearchResults(): void {
    this.searchResults = this.allGames;
    this.errorMessage = '';
    this.query = '';
  }
}
