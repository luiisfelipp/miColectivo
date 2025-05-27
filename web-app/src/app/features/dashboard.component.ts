import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 👈 Necesario para *ngFor, *ngIf

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // 👈 Asegúrate de incluirlo aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  drivers: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarVisibilidadPorVehiculo();
  }

  cargarVisibilidadPorVehiculo() {
    this.http.get<any[]>('http://localhost:3000/driver/visibilidad/por-vehiculo')
      .subscribe({
        next: (data) => this.drivers = data,
        error: (err) => console.error('Error al cargar visibilidad por vehículo:', err)
      });
  }

  toggleVisibilidad(driver: any) {
    const nuevoEstado = !driver.visible;

    this.http.post('http://localhost:3000/driver/visibilidad/por-vehiculo', {
      driverId: driver.id,
      visible: nuevoEstado
    }).subscribe({
      next: () => driver.visible = nuevoEstado,
      error: (err) => console.error('Error al actualizar visibilidad:', err)
    });
  }
}
