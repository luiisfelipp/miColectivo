import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegistroVisibilidad {
  id: number;
  id_vehiculo: number;
  nombre_vehiculo: string;
  accion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private baseUrl = 'http://localhost:3000/driver';

  constructor(private http: HttpClient) {}

  getHistorialVisibilidad(): Observable<RegistroVisibilidad[]> {
    return this.http.get<RegistroVisibilidad[]>(`${this.baseUrl}/visibilidad/historial`);
  }
}
