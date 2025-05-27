import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  vehiculosVisibles: boolean = true;

  constructor(private http: HttpClient) {
    this.cargarEstadoVisibilidad();
  }

  // Cargar estado actual desde backend
  cargarEstadoVisibilidad() {
    this.http.get<{visibles: boolean}>('http://localhost:3000/driver/vehiculos/visibilidad')
      .subscribe({
        next: (resp) => {
          this.vehiculosVisibles = resp.visibles;
        },
        error: (err) => {
          console.error('Error al cargar estado visibilidad:', err);
        }
      });
  }

  // Cambiar visibilidad al backend
  toggleVisibilidad() {
    const nuevoEstado = !this.vehiculosVisibles;
    this.http.post('http://localhost:3000/driver/vehiculos/visibilidad', { visibles: nuevoEstado })
      .subscribe({
        next: () => {
          this.vehiculosVisibles = nuevoEstado;
          console.log('Visibilidad actualizada:', nuevoEstado);
        },
        error: (err) => {
          console.error('Error al actualizar visibilidad:', err);
        }
      });
  }
}
