import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserData } from '../types/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() cartCount: number = 0;

  menuItems: IMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      link: '/dashboard',
    },
    {
      label: 'Profile',
      icon: 'fas fa-user',
      link: '/perfil',
    },
    {
      label: 'Search',
      icon: 'fas fa-search',
      link: '/search',
    },
    {
      label: 'Cart',
      icon: 'fas fa-shopping-cart',
      link: '/cart',
      count: 0,
    },
    {
      label: 'Logout',
      icon: 'fas fa-sign-out-alt',
      link: '/login',
    },
  ];

  username!: string;
  user!: UserData;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        console.log(user);
        this.user = user;
      });
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      this.userService.getUserData(user.username).subscribe((user) => {
        console.log(user);
        this.user = user;
      });

      // Retrieve cart count from UserService and update the menu item
      this.userService.getUserCartLength(this.username).subscribe((count: number) => {
        this.cartCount = count;
        this.menuItems[3].count = count;
      });
    });

    // Subscribe to cartChanged event to update cart count in real time
    this.userService.cartChanged.subscribe(() => {
      this.userService.getUserCartLength(this.username).subscribe((count: number) => {
        this.cartCount = count;
        this.menuItems[3].count = count;
      });
    });
  }

  showPopup: boolean = false;

  showCartPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}

interface IMenuItem {
  label: string;
  icon: string;
  link: string;
  count?: number;
}
