import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AvatarService } from '../services/avatar.service';
import { UserData } from '../types/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  username: string = '';
  displayName: string = '';
  avatar: string = '';
  error: string = '';
  success: boolean = false;
  avatarList: string[] = [];
  imageTooLargeError: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private avatarService: AvatarService
  ) {
    this.authService.getUser().subscribe((user) => {
      this.username = user.username;
      userService.getUserAvatar(this.username).subscribe((avatar) => {
        this.avatar = avatar;
      });
      userService.getDisplayName(this.username).subscribe((displayName) => {
        this.displayName = displayName;
      });
    });

    this.getAllAvatars();
  }

  updateProfile() {
    this.username = this.username.trim();
    this.userService
      .updateUser(this.displayName, this.avatar)
      .subscribe((result) => {
        console.log(result);
        if (result.error) {
          this.error = result.error;
        } else {
          this.error = '';
          this.success = true;
        }
      });
  }

  setAvatar(link: string) {
    this.avatar = link;
  }

  getAllAvatars() {
    this.avatarService.getAllAvatars().subscribe((list) => {
      this.avatarList = list;
    });
  }
}
