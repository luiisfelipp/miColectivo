import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) {}

  login() {
  this.authService.login(this.credentials).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);

      const role = response.role;

      if (role === 'chofer') {
        this.router.navigate(['/driver/home']);
      } else if (role === 'usuario') {
        this.router.navigate(['/mapa-colectivos']);
      } else {
        this.router.navigate(['/central']); // si algún día agregas esto
        
      }
    },
    error: async (err) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  });
}

}