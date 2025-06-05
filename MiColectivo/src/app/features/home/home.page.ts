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

   // Usuario y contraseña simulados
  mockUser = {
    username: 'adrian',
    password: '1234',
  };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    const { username, password } = this.credentials;

    if (username === this.mockUser.username && password === this.mockUser.password) {
      // Redirigir al mapa o dashboard simulado
      this.router.navigate(['/driver/home']);
    } else {
      // Mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}

//   login() {
//     this.authService.login(this.credentials).subscribe({
//       next: (response) => {
//         localStorage.setItem('auth_token', response.token);

//         // Supón que el backend devuelve el rol
//         const role = response.role; // ejemplo: 'chofer' o 'usuario'

//         if (role === 'chofer') {
//           this.router.navigate(['/driver/home']);
//         } else {
//           this.router.navigate(['/home']);
//         }
//       },
//       error: (err) => {
//         alert('Credenciales incorrectas');
//         console.error(err);
//       }
//     });
//   }
// }