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
  styleUrls: ['./cart-popup.component.css'],
})
export class CartPopupComponent {
  username!: string;
  user!: UserData;
  cartItems: number[] = [];
  cartItemsData: Item[] = [];
  isMBwaySelected: boolean = false;

  nif: number = 0;
  address: string = '';

  number: number = 0;

  cardNumber: number = 0;
  cardHolder: string = '';
  expirationDate: string = '';
  cvv: number = 0;

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
    const index = this.cartItems.findIndex((item) => item === itemId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.userService.removeFromCart(this.username, itemId).subscribe(() => {
        console.log('Item removed from cart');
      });
    }
  }

  removeAllItemsFromCart(itemId: number) {
    // remove all items with itemId from cart
    this.cartItems = this.cartItems.filter((item) => item !== itemId);
    this.cartItemsData = this.cartItemsData.filter(
      (item) => item._id !== itemId
    );
    this.userService.removeAllFromCart(this.username, itemId).subscribe(() => {
      console.log('Item removed from cart');
    });
  }

  addItemToCart(itemId: number) {
    this.cartItems.push(itemId);
    this.userService.addToCart(this.username, itemId).subscribe(() => {
      console.log('Item added to cart');
    });
  }

  togglePaymentForm() {
    this.isMBwaySelected = !this.isMBwaySelected;
  }

  buyCart() {
    if (this.cartItemsData.length === 0) {
      alert('Cart is empty');
      return;
    }

    const nifElement = document.getElementById('typeText') as HTMLInputElement;
    const addressElement = document.getElementById(
      'typeText'
    ) as HTMLInputElement;

    if (!nifElement || !addressElement) {
      alert('Please fill in all required fields');
      return;
    }

    const nif = parseInt(nifElement.value);
    const address = addressElement.value;

    if (this.isMBwaySelected) {
      const numberElement = document.getElementById(
        'typePhone'
      ) as HTMLInputElement;

      if (!numberElement) {
        alert('Please fill in all required fields');
        return;
      }

      const number = parseInt(numberElement.value);

      this.userService.buyMBway(nif, number, address).subscribe((res) => {
        console.log(res);
        if (res.message) {
          alert(res.message);
        } else {
          alert('MBway payment successful');
          this.cartItemsData = [];
        }
      });
    } else {
      const cardNumberElement = document.getElementById(
        'typeNumber'
      ) as HTMLInputElement;
      const cardHolderElement = document.getElementById(
        'typeName'
      ) as HTMLInputElement;
      const expirationDateElement = document.getElementById(
        'typeExp'
      ) as HTMLInputElement;
      const cvvElement = document.getElementById(
        'typeText'
      ) as HTMLInputElement;

      console.log(cardNumberElement.value);
      console.log(cardHolderElement.value);
      console.log(expirationDateElement.value);
      console.log(cvvElement.value);

      if (
        !cardNumberElement ||
        !cardHolderElement ||
        !expirationDateElement ||
        !cvvElement
      ) {
        alert('Please fill in all required fields');
        return;
      }

      this.userService
        .buyCard(
          nif,
          parseInt(cardNumberElement.value),
          cardHolderElement.value,
          expirationDateElement.value,
          parseInt(cvvElement.value),
          address
        )
        .subscribe((res) => {
          if (res.message) {
            alert(res.message);
          } else {
            alert('Card payment successful');
            this.cartItemsData = [];
          }
        });
    }
  }
}
