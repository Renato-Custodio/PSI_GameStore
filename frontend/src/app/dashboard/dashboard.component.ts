import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { List } from '../types/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser : any;
  lists : List[] = [];
  items : number[] = []
  followers : String[] = []
  following : String[] = []

  constructor(private authService: AuthService,private userService: UserService) {
    this.currentUser = this.authService.user;
    this.getLists().subscribe((list)=>{
      this.lists = list;
    });
    this.getItems().subscribe((list)=>{
      this.items = list;
    });
    this.getFollowers().subscribe((list)=>{
      this.followers = list;
    });
    this.getFollowing().subscribe((list)=>{
      this.following = list;
    });
  }

  getLists(){
    return this.userService.getLists(this.currentUser);
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
