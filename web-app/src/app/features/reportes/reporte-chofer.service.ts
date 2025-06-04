// src/app/features/reportes/reporte-chofer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReporteChofer {
  id: number;
  driver_id: string;
  type: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ReporteChoferService {
  private apiUrl = 'http://localhost:3000/api/reportes/chofer';

  constructor(private http: HttpClient) {}

  obtenerReportes(driverId: string): Observable<ReporteChofer[]> {
    return this.http.get<ReporteChofer[]>(`${this.apiUrl}/${driverId}`);
  }
}
