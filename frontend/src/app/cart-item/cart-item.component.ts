import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserData } from '../types/user';
import { Item } from '../types/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  username!: string;
  user!: UserData;

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
      });
    });
  }
  @Input() itemId!: number;
  game!: Item;

  ngOnInit() {
    this.itemService.getItem(this.itemId).subscribe((game) => {
      this.game = game;
    });
  }

  @Output() removeItem: EventEmitter<number> = new EventEmitter<number>();

  removeItemFromCart(itemId: number) {
    this.removeItem.emit(itemId);
  }
  
}
