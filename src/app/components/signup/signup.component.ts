import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
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
    if (this.userData.repeatPassword === this.userData.password) {
      const newUser: User = {
        username: this.userData.username, 
        password: this.userData.password };
      try {
        await this.userService.registerUser(newUser);
        Swal.fire({
          icon: "success",
          title: "Usuario Registrado",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/login');
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }
}
