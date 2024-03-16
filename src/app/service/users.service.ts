import { Injectable } from '@angular/core';
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [{"username": "jesus", "password": "diosesgrande"},
  {"username": "magdalena", "password": "jesusesgrande"},
  {"username": "judas", "password": "eldineroesgrande"}];
  constructor() { }

  public getUsers(){
    return this.users
  }
  public postUser(user: User){
    this.users.push(user)
  }
}
