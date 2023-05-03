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
  searchResults:  Item[] = [];
  errorMessage: string = '';

  constructor(private searchService: SearchService) {}

  searchGame(title:string) : void {
	title = title.trim();
	if(title.length < 3){
		return;
	}
    this.searchService
      .searchGames(title)
      .subscribe((searchResults) => {
		console.log(searchResults);
		if(searchResults.length === 0){
			this.errorMessage = "Nao foi encontrado nenhum jogo";
		} else{
			this.searchResults = searchResults;
		}
		});

  	}


}


