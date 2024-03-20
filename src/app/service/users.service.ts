import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) { }

  public getUsers() {
    return this.http.get<User[]>(`${this.API_URI}/users`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener datos de usuario: ', error);
          return throwError('Error al obtener datos de usuario');
        })
      );
  }

  public registerUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${this.API_URI}/register`, user)
      .pipe(
        catchError(error => {
          console.error('Error al registrar usuario: ', error);
          return throwError('Error al registrar usuario');
        })
      );
  }
  
  public login(user: User): Observable<void> {
    return this.http.get<any>(`${this.API_URI}/users`).pipe(
      map(response => {
        const users = response.users;
        console.log(users);
        if (users && users.length > 0) {
          const foundUser = users.find((u: { username: string; password: string; }) => u.username === user.username && u.password === user.password);
          if (foundUser) {
            localStorage.setItem('username', user.username);
            this.router.navigateByUrl('/welcome');
          } else {
            throw new Error("Credenciales incorrectas");
          }
        } else {
          throw new Error("No se encontraron usuarios o hubo un error al recuperarlos");
        }
      }),
      catchError(error => {
        console.error('Error al iniciar sesión: ', error);
        return throwError('Error al iniciar sesión');
      })
    );
  }
}
