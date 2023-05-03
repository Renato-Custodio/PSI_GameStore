import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserData } from '../types/userData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser : any;
  data : UserData | undefined
  constructor(private authService: AuthService,private userService: UserService) {
    this.currentUser = this.authService.user;
  }

  getLists(){
    return this.userService.getLists(this.currentUser).subscribe();
  }

  getItems(){
    return this.userService.getGames(this.currentUser);
  }

  getFollowers(){
    return this.userService.getFollowers(this.currentUser);
  }

  getFollowing(){
    return this.userService.getFollowing(this.currentUser);
  }
}
