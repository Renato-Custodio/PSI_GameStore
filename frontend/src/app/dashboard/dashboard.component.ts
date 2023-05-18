import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { forkJoin, map } from 'rxjs';
import { ItemData } from '../types/user';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  currentUser: string = '';
  lists: { id: number; name: string }[] = [];
  items: ItemData[] = [];
  followers: String[] = [];
  following: String[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private itemService: ItemService,
    private router: Router
  ) {
    this.authService.getUser().subscribe((user) => {
      this.currentUser = user.username;

      this.getLists().subscribe((list) => {
        const gameItems = list.map((game) => {
          return this.itemService.getItem(game).pipe(
            map((item) => {
              return {
                id: item._id,
                name: item.name,
                image: item.main_image,
                type: item.type,
              };
            })
          );
        });
        forkJoin(gameItems).subscribe((games) => {
          this.lists = games;
        });
      });
      this.getItems().subscribe((data) => {
        this.items = data;
      });
      this.getFollowers().subscribe((list) => {
        this.followers = list;
      });
      this.getFollowing().subscribe((list) => {
        this.following = list;
      });
    });
  }

  getItems() {
    return this.userService.getItems(this.currentUser);
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

  goToGamePage(id: number) {
    this.router.navigate(['/game', id]);
  }

  getDate(itemID: number): string {
    var dateString = '';
    this.items.forEach((item) => {
      if (item.id === itemID) {
        const date = new Date(item.timeOfPurchase);
        dateString = date.toLocaleDateString();
      }
    });
    return dateString;
  }

  sortItemsByTitle() {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortItemsByDate() {
    this.items.sort((a, b) =>
      a.timeOfPurchase.toString().localeCompare(b.timeOfPurchase.toString())
    );
  }

  removeFromWishlist(id: number) {
    this.userService.removeFromWishlist(this.currentUser, id).subscribe(
      () => {
        console.log('Removed from wishlist');
        console.log(id);
        alert('Game removed from wishlist successfully!');
      },
      (error) => {
        console.error('Error removing from wishlist:', error);
        alert('Error removing game from wishlist.');
      }
    );
  }
}
