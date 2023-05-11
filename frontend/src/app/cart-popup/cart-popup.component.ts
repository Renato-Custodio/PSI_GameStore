import { Component } from '@angular/core';
import { UserData } from '../types/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent {
  username!: string;
  user!: UserData;
  cartItems: number[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        console.log(user);
        this.user = user;
        this.cartItems = user.cart || []; // set cartItems to empty array if it doesn't exist in user object
        console.log(this.cartItems);
      });
    });
  }


}
