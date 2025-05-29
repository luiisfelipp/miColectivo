// src/app/features/reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reporte {
  id?: number;
  motivo: string;
  descripcion: string;
  colectivo: string;
  estado: string;
  nombre?: string;     // NUEVO
  email?: string;      // NUEVO
  telefono?: string;   // NUEVO
  
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(this.apiUrl);
  }


  actualizarReporte(reporte: Reporte): Observable<any> {
  return this.http.put(`${this.apiUrl}/${reporte.id}`, reporte);
}

}
