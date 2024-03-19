import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [{"username": "jesus", "password": "diosesgrande"},
  {"username": "magdalena", "password": "jesusesgrande"},
  {"username": "judas", "password": "eldineroesgrande"}];
  constructor(private router: Router) { }

  public getUsers(){
    return this.users
  }
  public postUser(user: User){
    this.users.push(user)
  }
  public login(user: User): void {
    const foundUser = this.users.find(u => u.username === user.username && u.password === user.password);
    if (foundUser) {
      localStorage.setItem('username', user.username);
      this.router.navigateByUrl('/welcome');
    } else {
      console.log("Credenciales incorrectas");
    }
  }
}
