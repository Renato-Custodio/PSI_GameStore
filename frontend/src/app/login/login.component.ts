import { Component } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;
  username: string = '';
  password: string = '';

  isPasswordValid = false;
  passwordCriteria: string[] = [];
  criteria: Observable<string[]> = new Observable<string[]>();

  onSubmit() {
    // do something with the form data
  }

  verifyPassword(password: string) {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    const isPasswordValid = regex.test(password);

    if (!isPasswordValid) {
      const passwordCriteria: string[] = [];
      if (password.length < 8) {
        passwordCriteria.push('Password must be at least 8 characters long.');
      }
      if (!password.match(/[A-Z]/)) {
        passwordCriteria.push('Password must contain at least one capital letter.');
      }
      if (!password.match(/[a-z]/)) {
        passwordCriteria.push('Password must contain at least one small letter.');
      }
      if (!password.match(/[0-9]/)) {
        passwordCriteria.push('Password must contain at least one number.');
      }

      this.criteria = new Observable<number>(observer => {
        observer.next(0);
      }).pipe(
        map(() => passwordCriteria)
      );
    } else {
      this.criteria = new Observable<string[]>(observer => {
        observer.next([]);
      });
    }
  }
}
