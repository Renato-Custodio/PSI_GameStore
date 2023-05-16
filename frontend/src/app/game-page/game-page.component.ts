import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../types/item';
import { ItemService } from '../services/item.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserData } from '../types/user';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent {
  username!: string;
  user!: UserData;
  constructor(private route: ActivatedRoute, private ItemService: ItemService, private UserService: UserService,private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.UserService.getUserData(user.username).subscribe((user) => {
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
    square_logo: '',
    main_image: '',
    image1: '',
    image2: '',
    background_image: '',
    video_link: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const _id = Number(id);
    this.ItemService.getItem(_id).subscribe(game => {
      this.game = game;
    });
  }

  addToWishlist() {
    this.UserService.addToWishlist(this.username, this.game._id).subscribe(() => {
      console.log('Added to wishlist');
      console.log(this.game._id);
      alert('Game added to wishlist successfully!');
    }, (error) => {
      console.error('Error adding to wishlist:', error);
      alert('Error adding game to wishlist.');
    });
  }


}
