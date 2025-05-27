import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  showDriverLogin = false;
  showUserLogin = false;

  credentials = {
    username: '',
    password: ''
  };

  userCredentials = {
    username: '',
    password: ''
  };
 
  
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/driver/home']);
      },
      error: (err) => {
        alert('Credenciales incorrectas');
        console.error(err);
      }
    });
  }
  userLogin() {
    this.authService.login(this.userCredentials).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Login inválido');
      }
    });
  }

}