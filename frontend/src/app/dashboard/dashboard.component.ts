import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable, forkJoin, map } from 'rxjs';
import { List } from '../types/user';
import { ItemService } from '../services/item.service';
import { Item } from '../types/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  currentUser: string = '';
  lists: string[] = [];
  games: string[] = [];
  followers: String[] = [];
  following: String[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private itemService: ItemService
  ) {
    this.authService.getUser().subscribe((user) => {
      this.currentUser = user.username;

      this.getLists().subscribe((list) => {
        const gameItems$ = list.map((game) => {
          return this.itemService.getItem(game).pipe(map((item) => item.name));
        });
        forkJoin(gameItems$).subscribe((games) => {
          this.lists = games;
        });
      });
      this.getGames().subscribe((list) => {
        const gameItems$ = list.map((game) => {
          return this.itemService.getItem(game).pipe(map((item) => item.name));
        });
        forkJoin(gameItems$).subscribe((games) => {
          this.games = games;
        });
      });
      this.getFollowers().subscribe((list) => {
        this.followers = list;
      });
      this.getFollowing().subscribe((list) => {
        this.following = list;
      });
    });
  }

  getGames() {
    return this.userService.getGames(this.currentUser);
  }

  getLists() {
    return this.userService.getLists(this.currentUser);
  }

  getFollowers() {
    return this.userService.getFollowers(this.currentUser);
  }

  getFollowing() {
    return this.userService.getFollowing(this.currentUser);
  }
}
