import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  searchResults:  Game[] = [];
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
		if(typeof(searchResults) === 'string'){
			this.errorMessage = searchResults;
		} else{
			this.searchResults = searchResults;
		}
		});

  	}


}


