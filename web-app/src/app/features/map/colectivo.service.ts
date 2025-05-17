import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Colectivo {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  passenger_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColectivoService {
  private apiUrl = 'http://localhost:3000/driver/locations'; // según server.js > driverRoutes :D

  constructor(private http: HttpClient) {}

  getColectivos(): Observable<Colectivo[]> {
    return this.http.get<Colectivo[]>(this.apiUrl);
  }
}

