import { Component, EventEmitter, Output } from '@angular/core';
import { UserData } from '../types/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../types/item';


@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent {
  username!: string;
  user!: UserData;
  cartItems: number[] = [];
  cartItemsData: Item[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private itemService: ItemService,
    private router: Router
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        console.log(user);
        this.user = user;
        this.cartItems = user.cart || []; // set cartItems to empty array if it doesn't exist in user object
        console.log(this.cartItems);
        this.getCartItems();
      });
    });
  }

  getCartItems() {
    // we have the ids of the items in the cart, but we need the actual item objects
    // so we need to make a request to the backend to get the items
    // we can use the itemService to do this

    for (let i = 0; i < this.cartItems.length; i++) {
      this.itemService.getItem(this.cartItems[i]).subscribe((item) => {
        this.cartItemsData.push(item);
      });
    }
    console.log(this.cartItemsData);
  }

  calculateTotal() {
    let total = 0;
    for (let i = 0; i < this.cartItemsData.length; i++) {
      total += this.cartItemsData[i].price;
    }
    return total;
  }

  @Output() closePopupEvent = new EventEmitter();

  closePopup() {
    this.closePopupEvent.emit();
  }


  removeItemFromCart(itemId: number) {
    const index = this.cartItems.findIndex(item => item === itemId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsData = this.cartItemsData.filter(item => item._id !== itemId);
      this.userService.removeFromCart(this.username, itemId).subscribe(() => {
        console.log('Item removed from cart');
      });
    }
  }
  
}
