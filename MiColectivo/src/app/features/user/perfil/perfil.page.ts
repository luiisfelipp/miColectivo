import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  usuario: any;

  constructor() { }

  ngOnInit() {
    // Simulación mientras conectas al backend real
  this.usuario = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+569 93949596'
  };
  }

}
