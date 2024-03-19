// login.component.ts
import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData: User = {
    username: '',
    password: ''
  };

  constructor(private userService: UsersService, private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.userData);
  }
}
