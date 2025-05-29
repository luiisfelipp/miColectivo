// Servicio Angular para interactuar con el backend
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reporte {
  id?: number;
  motivo: string;
  descripcion: string;
  colectivo: string;
  estado?: string;     
  nombre?: string;      
  email?: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  crearReporte(reporte: Reporte): Observable<Reporte> {
    return this.http.post<Reporte>(this.apiUrl, reporte);
  }

  obtenerReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.apiUrl);
  }

  eliminarReporte(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
