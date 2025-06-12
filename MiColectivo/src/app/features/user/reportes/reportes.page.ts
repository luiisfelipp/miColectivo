// Componente que utiliza el servicio para manejar reportes
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reporte, ReporteService } from '../../../core/services/reportes.service'; // Ajusta el path según tu estructura
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: false
})
export class ReportesPage implements OnInit {
  reportes: Reporte[] = [];
  formulario!: FormGroup;

  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+569 93949596'
  };
  // Lista de motivos disponibles para el formulario
  motivos = [
    'Pérdida de documentos',
    'Mal servicio',
    'Conductor agresivo',
    'Otro'
  ];

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService,
    private toastController: ToastController,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // Inicializa el formulario con validadores
    this.formulario = this.fb.group({
      motivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      colectivo: ['', Validators.required]
    });

    // Carga los reportes al iniciar
    this.cargarReportes();

    // Obtener datos del usuario logueado
  const token = localStorage.getItem('auth_token'); // Ojo: es 'auth_token' en tu AuthService
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.get('http://localhost:3000/auth/perfil', { headers }).subscribe({
    next: (data: any) => {
      this.usuario = data;
    },
    error: (err) => {
      console.error('Error al obtener datos del usuario logueado', err);
    }
  });

  }

  // Enviar el formulario al backend
  
  enviarReporte() {
    if (this.formulario.invalid) return;

    const nuevoReporte: Reporte = {
      ...this.formulario.value,
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      telefono: this.usuario.telefono
    };

    this.reporteService.crearReporte(nuevoReporte).subscribe({
      next: (reporteCreado) => {
        this.reportes.push(reporteCreado);
        this.formulario.reset();
        this.mostrarToast();
      },
      error: (error) => console.error('Error al enviar reporte:', error)
    });
  }

  //Mensaje de central al enviar reporte
  async mostrarToast() {
  const toast = await this.toastController.create({
    message: 'La central se comunicará con usted por teléfono o correo.',
    duration: 3000, // tiempo visible (ms)
    color: 'success',
    position: 'bottom' // puede ser 'top', 'middle' o 'bottom'
  });

  await toast.present();
  }

  // Obtener todos los reportes
  cargarReportes() {
    this.reporteService.obtenerReportes().subscribe({
      next: (lista) => (this.reportes = lista),
      error: (err) => console.error('Error al cargar reportes:', err)
    });
  }

  // Eliminar un reporte específico
  eliminarReporte(id: number) {
    this.reporteService.eliminarReporte(id).subscribe({
      next: () => {
        this.reportes = this.reportes.filter(r => r.id !== id);
      },
      error: (err) => console.error('Error al eliminar reporte:', err)
    });
  }
}
