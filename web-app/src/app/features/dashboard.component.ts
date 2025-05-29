import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 
import { Reporte, ReporteService } from '../features/reportes/reporte.service'; // ajusta ruta si es necesario


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // 👈 Asegúrate de incluirlo aquí
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  drivers: any[] = [];
  reportes: Reporte[] = [];
  seccionActiva: 'visibilidad' | 'reportes' = 'visibilidad';


  constructor(private http: HttpClient, private reporteService: ReporteService) {
    this.cargarVisibilidadPorVehiculo();
  }

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.reporteService.obtenerReportes().subscribe({
      next: (data) => this.reportes = data,
      error: (err) => console.error('Error cargando reportes:', err)
    });
  }

  cambiarSeccion(seccion: 'visibilidad' | 'reportes') {
    this.seccionActiva = seccion;
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

  //cambiar estados de reporte
  cambiarEstado(reporte: Reporte, nuevoEstado: string) {
  const actualizado = { ...reporte, estado: nuevoEstado };

  this.reporteService.actualizarReporte(actualizado).subscribe({
    next: () => {
      reporte.estado = nuevoEstado; // actualiza en la vista sin volver a cargar
    },
    error: err => {
      console.error('Error al actualizar estado del reporte', err);
    }
  });
  }
}



