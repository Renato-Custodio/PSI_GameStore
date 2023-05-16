import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import Compressor from 'compressorjs';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  username: string = '';
  error: string = '';
  success: boolean = false;
  avatar: string = "https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg";
  avatarList: string[] = [];
  imageTooLargeError: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private avatarService: AvatarService
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      // this.avatar = user.avatar;
    });
    this.getAllAvatars();
  }

  updateProfile() {
    this.username = this.username.trim();
    this.userService
      .updateUsername(this.username)
      .subscribe((result) => {
        if (result.error) {
          this.error = result.error;
        } else {
          this.error = '';
          this.success = true;
        }
      });
  }

  updateUsername() {
    this.username = this.username.trim();
    this.userService
      .updateUsername(this.username)
      .subscribe((result) => {
        if (result.error) {
          this.error = result.error;
        } else {
          this.error = '';
          this.success = true;
        }
      });

      this.userService.updateAvatar(this.avatar).subscribe((result) => {
        if (result.error) {
          this.error = result.error;
        } else {
          this.error = '';
          this.success = true;
        }
      });
  }

  updateAvatar() {
    this.userService.updateAvatar(this.avatar).subscribe((result) => {
      if (result.error) {
        this.error = result.error;
      } else {
        this.error = '';
        this.success = true;
      }
    });
  }

  setAvatar(link: string){
    this.avatar = link;
  }

  getAllAvatars(){
    this.avatarService.getAllAvatars().subscribe((list) => {
      this.avatarList = list;
    })
  }
}
