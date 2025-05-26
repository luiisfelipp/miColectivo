import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriverService } from 'src/app/core/services/driver.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class DriverHomePage implements OnInit, OnDestroy{
  passengerCount = 0;
  private locationInterval: any;
  driverId = '123'; // idealmente desde auth,, es un valor “quemado” (hardcoded), puesto manualmente para probar mientras se desarrolla.
  //más adelante, este ID se sacará del token JWT o del usuario autenticado
  //Esto lo pusimos a mano mientras no se tiene login de choferes. Pero en producción, se debería obtener automáticamente después que el chofer inicia sesión.

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.startSendingLocation();
  }
  ngOnDestroy() {
    clearInterval(this.locationInterval);
  }

  locationActive = false; // para indicar en el html si está activo

  startSendingLocation() {
    this.locationInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
  
          this.driverService.updateLocation(this.driverId, latitude, longitude).subscribe({
            next: () => {
              console.log('Ubicación actualizada');
              this.locationActive = true; // activamos el chip verde
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
    }, 3000); // cada 3segundos
  }

  // Cambiar cantidad y enviar al backend
  changePassengerCount(delta: number) {
    const newCount = this.passengerCount + delta;
    if (newCount < 0) return; // evita negativos
    if (newCount > 4) return;

    this.passengerCount = newCount;

    this.driverService.updatePassengerCount(this.passengerCount).subscribe({
      next: () => console.log('Cantidad de pasajeros actualizada'),
      error: err => console.error('Error al actualizar:', err)
    });
  }

}
