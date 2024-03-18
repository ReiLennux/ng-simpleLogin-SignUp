import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  userData = {
    username: '',
    password: ''
  };
  constructor(private userService: UsersService, private router:Router) {}

  async onSubmit() {
    const foundUser = this.userService.getUsers().find(user => user.username === this.userData.username && user.password === this.userData.password);
    
    if (foundUser) {
      this.router.navigateByUrl('/welcome');
    } else {
    }
  }
}
