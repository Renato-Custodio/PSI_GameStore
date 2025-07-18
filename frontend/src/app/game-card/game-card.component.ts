import { Component, Input } from '@angular/core';
import { Item } from '../types/item';
import { Router } from '@angular/router';
import { UserData } from '../types/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  username!: string;
  user!: UserData;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        this.user = user;
      });
    });
  }

  @Input() game: Item = {
    _id: 0,
    name: '',
    type: '',
    description: '',
    platform: '',
    language: '',
    price: 0,
    general_classification: 0,
    evaluations: [],
    main_image: '',
    image1: '',
    image2: '',
    background_image: '',
    video_link: '',
  };

  goToGamePage() {
    this.router.navigate(['/game', this.game._id]);
  }

  addToUserCart() {
    this.userService.addToCart(this.username, this.game._id).subscribe(
      () => {
        console.log('Added to cart');
      },
    );
  }

  addToWishlist() {
    this.userService.addToWishlist(this.username, this.game._id).subscribe(
      () => {
        console.log('Added to wishlist');
        alert('Game added to wishlist successfully!');
      },
      (error) => {
        console.error('Error adding to wishlist:', error);
        alert('Error adding game to wishlist.');
      }
    );
  }


}
