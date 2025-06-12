import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaz que representa a un chofer (driver) del sistema
interface Driver {
  id: number;
  name: string;
  visible: boolean;
  linea_id: number; // Línea a la que pertenece
}


@Component({
  selector: 'app-mapa-colectivos',
  templateUrl: './mapa-colectivos.page.html',
  styleUrls: ['./mapa-colectivos.page.scss'],
  standalone: false,
  
})
export class MapaColectivosPage implements OnInit {
  // Coordenadas de recorrido por línea
  lineaCoordenadas: { [lineaId: number]: google.maps.LatLngLiteral[] } = {
    1: [ 
      { lat: -33.6007128347909, lng: -70.71154892893544 },
      { lat: -33.59811202557675, lng: -70.71042826842779 },
      { lat: -33.59878269849519, lng: -70.70730832357687 },
      { lat: -33.59904177669798, lng: -70.70610966722803 },
      { lat: -33.59631825713132, lng: -70.70515377671293 },
      { lat: -33.596539427818826, lng: -70.70377304598303 },
      { lat: -33.59495962472213, lng: -70.70321544317109 },
      { lat: -33.59464366063627, lng: -70.70456582817069 },
      { lat: -33.59382673473333, lng: -70.70869722299125 },
      { lat: -33.58927642917139, lng: -70.70692125324311 },
      { lat: -33.59101057142675, lng: -70.69966684517914 }
    ],
    2: [
      { lat: -33.592776786559334, lng: -70.69968402995616 },
      { lat: -33.59843783711787, lng: -70.70166027414858 },
      { lat: -33.597486101310686, lng: -70.70557629923286 },
      { lat: -33.59463951383927, lng: -70.70455122847373 },
      { lat: -33.594389282203544, lng: -70.70592451948977 },
      { lat: -33.59383519531262, lng: -70.70859599961577 },
      { lat: -33.588965921987516, lng: -70.70684330493371 },
      { lat: -33.58815038571377, lng: -70.71011139114277},
    ]
  };
  // Referencia al trazo dibujado de la línea seleccionada
  lineaPolyline: google.maps.Polyline | null = null;


  map!: google.maps.Map;
  driverOverlays: any = {}; // clave: driver.name, valor: OverlayView con lógica
  // Diccionario que guarda si el vehículo está visible o no (por id)
  visibilidadPorVehiculo: { [id: number]: boolean } = {};

  // Lista de líneas de colectivo, que también llega desde el backend
  lineas: { id: number; nombre: string; color?: string }[] = [];
  // Línea seleccionada por el usuario en el <ion-select>
  lineaSeleccionada: number | null = null;

  // Lista completa de choferes que se reciben desde el backend
  drivers: Driver[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMap(); // carga el mapa
    this.obtenerLineas(); // obtiene las líneas desde el backend
    this.startFetchingDrivers();
    this.fetchDriversConLinea();     // una vez, para saber a qué línea pertenece cada chofer
  }

  // Esta función solo se usa al principio para saber qué línea tiene cada chofer
fetchDriversConLinea() {
  this.http.get<Driver[]>('http://localhost:3000/driver/con-linea')
    .subscribe({
      next: (data) => {
        this.drivers = data; // guardamos solo para lógica de filtrado por línea
      },
      error: (err) => {
        console.error('Error al obtener choferes con línea:', err);
      }
    });
}


obtenerLineas() {
  this.http.get<any[]>('http://localhost:3000/lineas').subscribe(data => {
    this.lineas = data;
  });
}

// Esta función se llama cuando el usuario selecciona una línea
filtrarPorLinea() {
  // Filtrar la visibilidad de colectivos según la línea seleccionada
  this.drivers.forEach(driver => {
    const visible = this.lineaSeleccionada === null || driver.linea_id === this.lineaSeleccionada;
    this.visibilidadPorVehiculo[driver.id] = visible;
  });

  // Eliminar línea anterior si existe
  if (this.lineaPolyline) {
    this.lineaPolyline.setMap(null);
    this.lineaPolyline = null;
  }

  // Si hay una línea seleccionada y tiene coordenadas definidas...
  if (this.lineaSeleccionada !== null && this.lineaCoordenadas[this.lineaSeleccionada]) {
    const path = this.lineaCoordenadas[this.lineaSeleccionada];

    // Buscar el color correspondiente a la línea desde this.lineas
    const linea = this.lineas.find(l => l.id === this.lineaSeleccionada);
    const color = linea?.color || '#0000FF'; // azul por defecto

    this.lineaPolyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.9,
      strokeWeight: 6
    });

    this.lineaPolyline.setMap(this.map);
  }
}


  
//
fetchVisibilidadPorVehiculo() {
    this.http.get<{ id: number; name: string; visible: boolean }[]>(
      'http://localhost:3000/driver/visibilidad/por-vehiculo'
    ).subscribe({
      next: (data) => {
        data.forEach(item => {
          this.visibilidadPorVehiculo[item.id] = item.visible;
        });
      },
      error: (err) => {
        console.error('Error al obtener visibilidad por vehículo:', err);
      }
    });
}


  // Cargar el mapa al centro de San Bernardo
loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -33.59635152196424, lng: -70.70481241349121 },
      zoom: 15,
    };
    

    this.map = new google.maps.Map(
      document.getElementById('mapa') as HTMLElement,
      mapOptions
    );
}


// Calcular rotación (en grados) entre dos coordenadas
getRotationAngle(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const dLon = toRad(lng2 - lng1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);

  let angle = toDeg(Math.atan2(y, x));
  return (angle + 360) % 360;
}

// Actualizar overlays cada cierto tiempo
startFetchingDrivers() {
  setInterval(() => {
    // 1. Obtener visibilidad actual
    this.http.get<{ id: number; name: string; visible: boolean }[]>(
      'http://localhost:3000/driver/visibilidad/por-vehiculo'
    ).subscribe({
      next: (data) => {
        data.forEach(item => {
          this.visibilidadPorVehiculo[item.id] = item.visible;
        });

        // 2. Luego obtener y dibujar los colectivos
        this.fetchDrivers();
      },
      error: (err) => {
        console.error('Error al obtener visibilidad por vehículo:', err);
      }
    });
  }, 2500);
}


fetchDrivers() {
  this.http.get<any[]>('http://localhost:3000/driver/locations').subscribe({
    next: (drivers) => this.updateDriverOverlays(drivers),
    error: (err) => console.error('Error al obtener ubicaciones:', err),
  });
}

// Crear o actualizar los overlays con imágenes rotadas
updateDriverOverlays(drivers: any[]) {
  drivers.forEach((driver) => {
  const driverId = driver.id;
  const name = driver.name;

  const visible = this.visibilidadPorVehiculo[driverId];
  const coincideLinea = this.lineaSeleccionada === null || driver.linea_id === this.lineaSeleccionada;

  // Si no debe mostrarse (por visibilidad o filtro), lo removemos del mapa
  if (!visible || !coincideLinea) {
    if (this.driverOverlays[name]) {
      this.driverOverlays[name].setMap(null);
      delete this.driverOverlays[name];
    }
    return;
  }


    const position = new google.maps.LatLng(driver.latitude, driver.longitude);
    const passengerCount = driver.passenger_count || 0;
    const maxPassengers = 4;

    const imageUrl = passengerCount >= maxPassengers
      ? 'assets/icon/rojo.png'
      : 'assets/icon/verde.png';

    // Si ya existe, actualizarlo
    if (this.driverOverlays[name]) {
      const overlay = this.driverOverlays[name];
      const prevLatLng = overlay.getPosition();
      const angle = this.getRotationAngle(
        prevLatLng.lat(),
        prevLatLng.lng(),
        driver.latitude,
        driver.longitude
      );
      overlay.setRotation(angle);
      overlay.animateTo(position);
    } else {
      // Si no existe (porque fue ocultado o es nuevo), crearlo
      const overlay = this.createDriverOverlay(name, position, imageUrl, passengerCount);
      overlay.setMap(this.map);
      this.driverOverlays[name] = overlay;
    }
  });
}



// Crear un OverlayView personalizado con rotación
createDriverOverlay(name: string, position: google.maps.LatLng, imageUrl: string, passengerCount: number) {
  const self = this;

  class RotatedOverlay extends google.maps.OverlayView {
    div!: HTMLElement;
    angle: number = 0;
    latLng: google.maps.LatLng = position;

    override onAdd() {
      this.div = document.createElement('div');
      this.div.style.position = 'absolute';
      this.div.style.cursor = 'pointer';

      // Crear imagen rotada
      const img = document.createElement('img');
      img.src = imageUrl;
      img.style.width = '40px';
      img.style.transition = 'transform 0.3s ease';
      img.style.transform = `rotate(${this.angle}deg)`;

      // Crear popup oculto (info del chofer)
      const popup = document.createElement('div');
      popup.innerHTML = `
        <div style="font-family: Arial; font-size: 13px;">
          <b>${name}</b><br>
          🧍 ${passengerCount} / 4 pasajeros<br>
          🚦 Estado: <span style="color:${passengerCount >= 4 ? 'red' : 'green'};">
            ${passengerCount >= 4 ? 'Lleno' : 'Disponible'}
          </span>
        </div>
      `;
      popup.style.position = 'absolute';
      popup.style.top = '-80px';
      popup.style.left = '-50px';
      popup.style.background = 'white';
      popup.style.border = '1px solid #ccc';
      popup.style.padding = '6px 8px';
      popup.style.borderRadius = '5px';
      popup.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      popup.style.display = 'none';
      popup.style.zIndex = '1000';

      // Toggle al hacer clic en el ícono
      this.div.onclick = () => {
        popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
      };

      // Agregar imagen y popup al div del marcador
      this.div.appendChild(img);
      this.div.appendChild(popup);

      // Agregar al mapa
      const panes = this.getPanes();
      panes?.overlayMouseTarget.appendChild(this.div);
    }

    override draw() {
      const projection = this.getProjection();
      if (!projection) return;
      const point = projection.fromLatLngToDivPixel(this.latLng);
      if (point && this.div) {
        this.div.style.left = `${point.x - 20}px`; // centrar imagen
        this.div.style.top = `${point.y - 20}px`;
      }
    }

    override setMap(map: google.maps.Map | null) {
      super.setMap(map);
    }

    setRotation(angle: number) {
      this.angle = angle;
      const img = this.div?.querySelector('img');
      if (img) img.style.transform = `rotate(${angle}deg)`;
    }

    getPosition() {
      return this.latLng;
    }

    animateTo(toLatLng: google.maps.LatLng) {
      const frames = 60;
      let step = 0;
      const from = this.latLng;
      const fromLat = from.lat();
      const fromLng = from.lng();
      const toLat = toLatLng.lat();
      const toLng = toLatLng.lng();

      const interval = setInterval(() => {
        step++;
        const lat = fromLat + (toLat - fromLat) * (step / frames);
        const lng = fromLng + (toLng - fromLng) * (step / frames);
        this.latLng = new google.maps.LatLng(lat, lng);
        this.draw();

        if (step === frames) {
          clearInterval(interval);
          this.latLng = toLatLng;
        }
      }, 25);
    }
    override onRemove() {
      if (this.div && this.div.parentNode) {
        this.div.parentNode.removeChild(this.div);
      }
    } 
  }

  return new RotatedOverlay();
}

}
