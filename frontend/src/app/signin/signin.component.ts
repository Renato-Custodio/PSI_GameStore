import { Component } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  username: string = '';
  password: string = '';

  passwordFeedback: string = '';
  usernameFeedback: string = '';

  isPasswordValid: boolean = false;
  isUsernameValid: boolean = false;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}


  createUser() {
    this.authService.registerUser(this.username, this.password).subscribe((response: any) => {
      if (response.error) {
        alert(response.error);
      } else {
        alert('User created successfully!');
        this.router.navigate(['/login']); // Navigate to the login component
      }
    });
  }

  verifyUsername(username: string) {
    //only letters and numbers
    //min 3 characters
    //max 20 characters
    const regex = /^[a-zA-Z0-9]{3,20}$/;

    if (!regex.test(username)) {
      if (username.length < 3) {
        this.usernameFeedback = 'Username must be at least 3 characters long.';
        this.isUsernameValid = false;
      }
      if (username.length > 20) {
        this.usernameFeedback = 'Username must be at most 20 characters long.';
        this.isUsernameValid = false;
      }
      if (username.match(/[^a-zA-Z0-9]/)) {
        this.usernameFeedback =
          'Username must contain only letters and numbers.';
        this.isUsernameValid = false;
      }
    } else {
      this.usernameFeedback = '';
      this.isUsernameValid = true;
    }

    if (username === '') {
      this.usernameFeedback = '';
      this.isUsernameValid = false;
    }
  }

  verifyPassword(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!regex.test(password)) {
      if (password.length < 8) {
        this.passwordFeedback = 'Password must be at least 8 characters long.';
        this.isPasswordValid = false;
      }
      if (!password.match(/[A-Z]/)) {
        this.passwordFeedback =
          ' Password must contain at least one capital letter.';
        this.isPasswordValid = false;
      }
      if (!password.match(/[a-z]/)) {
        this.passwordFeedback =
          ' Password must contain at least one lowercase letter.';
        this.isPasswordValid = false;
      }
      if (!password.match(/[0-9]/)) {
        this.passwordFeedback = ' Password must contain at least one number.';
        this.isPasswordValid = false;
      }
    } else {
      this.passwordFeedback = '';
      this.isPasswordValid = true;
    }

    if (password === '') {
      this.passwordFeedback = '';
      this.isPasswordValid = false;
    }
  }
}
