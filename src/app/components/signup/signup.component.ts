import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userData = {
    username: '',
    password: '',
    repeatPassword: ''
  };

  constructor(private userService: UsersService, private router: Router) { }

  async onSubmit() {
    console.log(this.userData);
    if (this.userData.repeatPassword === this.userData.password) {
      const newUser: User = {
        username: this.userData.username, 
        password: this.userData.password };
      try {
        console.log(newUser);
        await this.userService.postUser(newUser);
        this.router.navigateByUrl('/login');
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    } else {
      console.error('Las contraseñas no coinciden');

    }
  }
}
