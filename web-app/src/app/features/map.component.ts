import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ColectivoService, Colectivo } from './map/colectivo.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [ColectivoService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  colectivos: Colectivo[] = [];  // Lista actual de colectivos con sus datos
  center = { lat: -33.5935, lng: -70.6989 }; // Centro inicial del mapa (San Bernardo)
  scaledSize = new google.maps.Size(40, 40); // Tamaño de los iconos en el mapa

  // Mapa de overlays para animar la posición y rotación
  private overlays: Map<string, {
    position: google.maps.LatLng,
    rotation: number,
    targetPosition: google.maps.LatLng
  }> = new Map();

  constructor(private colectivoService: ColectivoService) {}

  ngOnInit() {
    // Cargar los colectivos inicialmente
    this.cargarColectivos();

    // Actualizar la lista y animar la posición cada 3 segundos
    setInterval(() => this.cargarColectivos(), 3000);
  }

  /**
   * Llama al servicio para obtener la lista de colectivos y actualiza las posiciones animadamente
   */
  cargarColectivos() {
    this.colectivoService.getColectivos().subscribe(data => {
      // Guardamos la lista para mostrar los markers con Angular (iconos estáticos)
      this.colectivos = data;

      // Actualizamos los overlays animados con rotación y movimiento suave
      this.actualizarOverlays(data);
    });
  }

  /**
   * Actualiza las posiciones y rotaciones de los colectivos para movimiento fluido
   * @param nuevosColectivos lista actualizada de colectivos con lat/lng y pasajeros
   */
  private actualizarOverlays(nuevosColectivos: Colectivo[]) {
    nuevosColectivos.forEach(colectivo => {
      const nombre = colectivo.name;
      const nuevaPos = new google.maps.LatLng(colectivo.latitude, colectivo.longitude);
      
      if (!this.overlays.has(nombre)) {
        // Si no existe overlay para este colectivo, creamos uno nuevo
        this.overlays.set(nombre, {
          position: nuevaPos,
          targetPosition: nuevaPos,
          rotation: 0
        });
      } else {
        // Si existe, actualizamos la posición objetivo para animar el movimiento
        const overlay = this.overlays.get(nombre)!;
        overlay.targetPosition = nuevaPos;

        // Calculamos la rotación entre posición actual y nueva para que el icono gire
        overlay.rotation = this.calcularRotacion(
          overlay.position.lat(), overlay.position.lng(),
          nuevaPos.lat(), nuevaPos.lng()
        );
      }
    });

    // Iniciamos la animación para mover los overlays hacia su posición objetivo suavemente
    this.animarMovimiento();
  }

  /**
   * Calcula el ángulo en grados entre dos puntos geográficos para rotar el icono
   * @param lat1 latitud origen
   * @param lng1 longitud origen
   * @param lat2 latitud destino
   * @param lng2 longitud destino
   * @returns ángulo en grados (0-360)
   */
  private calcularRotacion(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (deg: number) => deg * Math.PI / 180;
    const toDeg = (rad: number) => rad * 180 / Math.PI;

    const dLon = toRad(lng2 - lng1);
    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
              Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);

    let angle = toDeg(Math.atan2(y, x));
    return (angle + 360) % 360;
  }

  /**
   * Función que anima el movimiento suave interpolando la posición actual hacia la posición objetivo
   * Esto se puede llamar repetidamente para suavizar la transición en cada colectivo
   */
  private animarMovimiento() {
    const frames = 30; // Número de frames para animar
    let step = 0;

    const interval = setInterval(() => {
      step++;
      // Recorremos todos los overlays y actualizamos su posición interpolada
      this.overlays.forEach((overlay, key) => {
        const fromLat = overlay.position.lat();
        const fromLng = overlay.position.lng();
        const toLat = overlay.targetPosition.lat();
        const toLng = overlay.targetPosition.lng();

        // Interpolación lineal para suavizar movimiento
        const lat = fromLat + (toLat - fromLat) * (step / frames);
        const lng = fromLng + (toLng - fromLng) * (step / frames);

        overlay.position = new google.maps.LatLng(lat, lng);

        // Al terminar la animación, ponemos la posición exactamente en destino
        if (step === frames) {
          overlay.position = overlay.targetPosition;
        }
      });

      // Fuerza Angular a actualizar el template con nueva posición
      // Esto solo funciona si el template accede a overlays o similar
      // Si no, aquí se podría emitir un evento o usar un BehaviorSubject para refrescar
      // En este caso el template usa colectivos, por lo que esta animación es visualmente independiente

      if (step === frames) {
        clearInterval(interval);
      }
    }, 50);
  }

  /**
   * Este método sirve para obtener la posición y rotación de un colectivo para usar en el template,
   * en caso que quieras mostrar iconos con rotación en vez de estáticos.
   * Por defecto en el template usas los colectivos normales, pero acá está para futuras mejoras.
   */
  getOverlayPosition(name: string): google.maps.LatLng | null {
    return this.overlays.get(name)?.position ?? null;
  }

  getOverlayRotation(name: string): number {
    return this.overlays.get(name)?.rotation ?? 0;
  }
}
