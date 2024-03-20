import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.userService.login(this.userData)
      .subscribe(
        () => {
          Swal.fire({
            icon: "success",
            title: "Sesión Iniciada",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 2000
          });
        }
      );
  }
}
