import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData } from '../types/user';
import { AuthService } from '../services/auth.service';
import { ItemService } from '../services/item.service';
import { forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  username!: string;
  user!: UserData;
  lists: { id: number; name: string }[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private itemService: ItemService
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        this.user = user;
      });
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
    });
  }

  activeLinkIndex = 0;

  setActiveLinkIndex(index: number) {
    this.activeLinkIndex = index;
  }

  getLists() {
    return this.userService.getLists(this.username);
  }

  goToGamePage(id: number) {
    this.router.navigate(['/game', id]);
  }

  getDate(itemID: number): string {
    var dateString = '';
    this.user.items.forEach((item) => {
      if (item.id === itemID) {
        const date = new Date(item.timeOfPurchase);
        dateString = date.toLocaleDateString();
      }
    });
    return dateString;
  }

  removeFromWishlist(id: number) {
    this.userService.removeFromWishlist(this.username, id).subscribe(
      () => {
        console.log('Removed from wishlist');
        alert('Game removed from wishlist successfully!');
      },
      (error) => {
        console.error('Error removing from wishlist:', error);
        alert('Error removing game from wishlist.');
      }
    );
}

sortItemsByTitle() {
  this.user.items.sort((a, b) => a.name.localeCompare(b.name));
}

sortItemsByDate() {
  this.user.items.sort((a, b) => a.timeOfPurchase.toString().localeCompare(b.timeOfPurchase.toString()));
}
}
