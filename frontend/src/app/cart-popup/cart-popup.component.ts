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
    const uniqueCartItems: number[] = this.getUniqueCartItems(this.cartItems);

    for (const itemId of uniqueCartItems) {
      this.itemService.getItem(itemId).subscribe((item) => {
        this.cartItemsData.push(item);
      });
    }

    console.log(this.cartItemsData);
  }

  getUniqueCartItems(cartItems: number[]): number[] {
    const uniqueItems: number[] = [];
    const itemMap: { [itemId: number]: boolean } = {};

    for (const itemId of cartItems) {
      if (!itemMap[itemId]) {
        uniqueItems.push(itemId);
        itemMap[itemId] = true;
      }
    }

    return uniqueItems;
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItemsData) {
      const quantity = this.getItemQuantity(item._id);
      total += item.price * quantity;
    }
    return total;
  }

  @Output() closePopupEvent = new EventEmitter();

  closePopup() {
    this.closePopupEvent.emit();
  }

  getItemQuantity(itemId: number): number {
    let quantity = 0;
    for (const cartItemId of this.cartItems) {
      if (cartItemId === itemId) {
        quantity++;
      }
    }
    return quantity;
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

  removeAllItemsFromCart(itemId: number) {
    // remove all items with itemId from cart
    this.cartItems = this.cartItems.filter(item => item !== itemId);
    this.cartItemsData = this.cartItemsData.filter(item => item._id !== itemId);
    this.userService.removeAllFromCart(this.username, itemId).subscribe(() => {
      console.log('Item removed from cart');
    }
    );
  }

  addItemToCart(itemId: number) {
    this.cartItems.push(itemId);
    this.userService.addToCart(this.username, itemId).subscribe(() => {
      console.log('Item added to cart');
    });
  }
}
