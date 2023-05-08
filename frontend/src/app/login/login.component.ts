import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  isPasswordValid = false;
  passwordCriteria: string[] = [];
  criteria: Observable<string[]> = new Observable<string[]>();
  user: User | null = null;

  authenticate(username: string, password: string): void {
    username = username.trim();
    if (!username) {
      return;
    }
    this.authService.authenticateUser(username, password).subscribe((ret) => {
      if (ret.error) {
        alert(`A combinação username/password está incorreta!`);
      } else {
        this.user = ret;
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
