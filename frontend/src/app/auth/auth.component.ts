import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, fromEvent, timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';
import { User } from '../user';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router : Router) {}
  
  isPasswordValid = false;
  passwordCriteria: string[] = [];
  criteria: Observable<string[]> = new Observable<string[]>();
  user: User | null = null;

  authenticate(username: string, password: string): void {
    username = username.trim();
    if (!username){
      return;
    }
    this.authService.authenticateUser(username, password).subscribe(u => 
      {console.log(u); 
        this.user = u;
        if(this.user !== null){
          this.router.navigate(['/dashboard']);
        }});
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


