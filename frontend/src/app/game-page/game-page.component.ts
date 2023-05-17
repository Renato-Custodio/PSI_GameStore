import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../types/item';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserData } from '../types/user';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent {
  username!: string;
  user!: UserData;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ItemService: ItemService,
    private route: ActivatedRoute
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        console.log(user);
        this.user = user;
      });
    });
  }

  game: Item = {
    _id: 0,
    name: '',
    type: '',
    description: '',
    platform: '',
    language: '',
    price: 0,
    general_classification: '',
    evaluations: '',
    main_image: '',
    image1: '',
    image2: '',
    background_image: '',
    video_link: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const _id = Number(id);
    this.ItemService.getItem(_id).subscribe((game) => {
      this.game = game;
    });
  }

  addToUserCart() {
    this.userService.addToCart(this.username, this.game._id).subscribe(
      () => {
        console.log('Added to cart');
        console.log(this.game._id);
      },
      (error) => {
        console.error('Error adding to cart:', error);
        alert('The item is already in your cart!');
      }
    );
  }

  addToWishlist() {
    this.userService.addToWishlist(this.username, this.game._id).subscribe(
      () => {
        console.log('Added to wishlist');
        console.log(this.game._id);
        alert('Game added to wishlist successfully!');
      },
      (error) => {
        console.error('Error adding to wishlist:', error);
        alert('Error adding game to wishlist.');
      }
    );
  }

  removeFromWishlist() {
    this.userService.removeFromWishlist(this.username, this.game._id).subscribe(
      () => {
        console.log('Removed from wishlist');
        console.log(this.game._id);
        alert('Game removed from wishlist successfully!');
      },
      (error) => {
        console.error('Error removing from wishlist:', error);
        alert('Error removing game from wishlist.');
      }
    );
  }
}
