import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage{
  credentials = {
  username: '',
  email: '',
  numero_telefono: '',
  password: '',
  role: 'usuario' // por defecto
  };

  constructor(
     private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

 async register() {
    this.authService.register(this.credentials).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/home']); // Volver al login
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error.message || 'Error en el registro',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
