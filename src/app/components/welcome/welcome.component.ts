import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')!== null? ' '+localStorage.getItem('username') : '... espera, no eres nadie >:('.toString();

  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }
}
