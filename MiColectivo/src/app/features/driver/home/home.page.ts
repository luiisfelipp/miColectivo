import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriverService } from '../../../core/services/driver.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class DriverHomePage implements OnInit, OnDestroy {
  currentPassengers = 0;
  private locationInterval: any;
  locationActive = false;

  // ID del chofer hardcodeado para pruebas
  driverId = '123'; // En producción, se obtiene del token JWT

  constructor(
    private driverService: DriverService,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.startSendingLocation();
  }

  ngOnDestroy() {
    clearInterval(this.locationInterval);
  }

  // Envío periódico de ubicación cada 3 segundos
  startSendingLocation() {
    this.locationInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          this.driverService.updateLocation(this.driverId, latitude, longitude).subscribe({
            next: () => {
              console.log('Ubicación actualizada');
              this.locationActive = true;
            },
            error: err => {
              console.error('Error al actualizar ubicación:', err);
              this.locationActive = false;
            }
          });
        },
        (err) => {
          console.error('Error obteniendo ubicación:', err);
          this.locationActive = false;
        },
        { enableHighAccuracy: true }
      );
    }, 3000);
  }

  setPassengerCount(count: number) {
  this.currentPassengers = count;
  this.driverService.updatePassengerCount(this.currentPassengers).subscribe({
    next: () => console.log('Cantidad de pasajeros actualizada'),
    error: err => console.error('Error al actualizar:', err)
  });
}

// Conectado al driver service, con el método sendAlert para la centrl
// Enviar alerta y mostrar TOAST
sendEmergencyAlert(type: string) {
  this.driverService.sendAlert(this.driverId, type).subscribe({
    next: () => {
      console.log(`Alerta enviada: ${type}`);
      this.showAlertToast(type); // <- Aquí llamamos al toast después del éxito
    },
    error: err => {
      console.error('Error al enviar alerta:', err);
    }
  });
}

// TOAST para avisar al chofer
async showAlertToast(alertType: string) {
  const toast = await this.toastController.create({
    message: `🚨 Alerta de ${alertType} enviada correctamente`,
    duration: 2000,
    color: 'warning',
    position: 'bottom'
  });
  await toast.present();
}

  logout() {
  this.authService.logout();
  this.router.navigate(['/home']);
}


}
