import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData } from '../types/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
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

  links = [{ text: 'Library' }, { text: 'Lists' }, { text: 'Social' }];
  contents = [
    { text: 'Content for Link 1' },
    { text: 'Content for Link 2' },
    { text: 'Content for Link 3' },
  ];
  activeLinkIndex = 0;

  setActiveLinkIndex(index: number) {
    this.activeLinkIndex = index;
  }
}
