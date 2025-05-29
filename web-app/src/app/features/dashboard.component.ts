import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Reporte, ReporteService } from '../features/reportes/reporte.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  drivers: any[] = [];
  reportes: Reporte[] = [];
  seccionActiva: 'visibilidad' | 'reportes' = 'visibilidad';

  // Lista fija de motivos con sus colores asignados para la leyenda fija
  motivosGuia: { motivo: string; color: string }[] = [
    { motivo: 'Pérdida de documentos', color: '#007bff' },  // azul
    { motivo: 'Mal servicio', color: '#28a745' },           // verde
    { motivo: 'Conductor agresivo', color: '#ffc107' },     // amarillo
    { motivo: 'Otro', color: '#dc3545' }                    // rojo
  ];

  // Aquí guardaremos los motivos que están presentes en los reportes, con cantidad y color para el gráfico
  motivosResumen: { motivo: string; cantidad: number; color: string }[] = [];

  // Estadísticas
  totalReportes = 0;
  pendientes = 0;
  enProceso = 0;
  finalizados = 0;

  totalDrivers = 0;
  visibles = 0;
  ocultos = 0;

  @ViewChild('graficoMotivos', { static: false }) graficoMotivosCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private http: HttpClient, private reporteService: ReporteService) {
    this.cargarVisibilidadPorVehiculo();
  }

  ngOnInit(): void {
    this.cargarReportes();
  }

  ngAfterViewInit(): void {
    // No hacemos nada aquí porque generamos el gráfico luego de cargar reportes
  }

  cargarReportes(): void {
    this.reporteService.obtenerReportes().subscribe({
      next: (data) => {
        this.reportes = data;
        this.totalReportes = data.length;
        this.pendientes = data.filter(r => !r.estado || r.estado === 'Pendiente').length;
        this.enProceso = data.filter(r => r.estado === 'En proceso').length;
        this.finalizados = data.filter(r => r.estado === 'Finalizado').length;

        if (this.chart) {
          this.chart.destroy();
        }

        setTimeout(() => this.generarGraficoPorMotivo(), 0);
      },
      error: (err) => console.error('Error cargando reportes:', err)
    });
  }

  generarGraficoPorMotivo(): void {
    if (!this.graficoMotivosCanvas?.nativeElement) return;

    // Conteo real por motivo
    const conteoPorMotivo: { [motivo: string]: number } = {};
    this.reportes.forEach(r => {
      conteoPorMotivo[r.motivo] = (conteoPorMotivo[r.motivo] || 0) + 1;
    });

    // Obtener solo los motivos que están en reportes, y asignarles su color desde la guía
    const motivosPresentes = Object.keys(conteoPorMotivo);

    this.motivosResumen = motivosPresentes.map(motivo => {
      const guia = this.motivosGuia.find(g => g.motivo === motivo);
      return {
        motivo,
        cantidad: conteoPorMotivo[motivo],
        color: guia ? guia.color : '#999999' // gris si no está en la guía
      };
    });

    const labels = this.motivosResumen.map(item => item.motivo);
    const dataValues = this.motivosResumen.map(item => item.cantidad);
    const backgroundColors = this.motivosResumen.map(item => item.color);

    const chartData = {
      labels,
      datasets: [{
        label: 'Cantidad por Motivo',
        data: dataValues,
        backgroundColor: backgroundColors
      }]
    };

    this.chart = new Chart(this.graficoMotivosCanvas.nativeElement, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // ocultamos la leyenda automática para mostrar la fija abajo
          }
        }
      }
    });
  }

  cambiarSeccion(seccion: 'visibilidad' | 'reportes') {
    this.seccionActiva = seccion;
    if (seccion === 'reportes') {
      setTimeout(() => {
        if (this.chart) this.chart.destroy();
        this.generarGraficoPorMotivo();
      }, 0);
    }
  }

  cargarVisibilidadPorVehiculo() {
    this.http.get<any[]>('http://localhost:3000/driver/visibilidad/por-vehiculo')
      .subscribe({
        next: (data) => {
          this.drivers = data;
          this.totalDrivers = data.length;
          this.visibles = data.filter(d => d.visible).length;
          this.ocultos = data.filter(d => !d.visible).length;
        },
        error: (err) => console.error('Error al cargar visibilidad por vehículo:', err)
      });
  }

  toggleVisibilidad(driver: any) {
    const nuevoEstado = !driver.visible;
    this.http.post('http://localhost:3000/driver/visibilidad/por-vehiculo', {
      driverId: driver.id,
      visible: nuevoEstado
    }).subscribe({
      next: () => {
        driver.visible = nuevoEstado;
        this.totalDrivers = this.drivers.length;
        this.visibles = this.drivers.filter(d => d.visible).length;
        this.ocultos = this.drivers.filter(d => !d.visible).length;
      },
      error: (err) => console.error('Error al actualizar visibilidad:', err)
    });
  }

  cambiarEstado(reporte: Reporte, nuevoEstado: string) {
    const actualizado = { ...reporte, estado: nuevoEstado };

    this.reporteService.actualizarReporte(actualizado).subscribe({
      next: () => {
        reporte.estado = nuevoEstado;
        this.cargarReportes();
      },
      error: err => {
        console.error('Error al actualizar estado del reporte', err);
      }
    });
  }
}
