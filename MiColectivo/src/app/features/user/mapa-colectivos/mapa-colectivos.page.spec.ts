import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaColectivosPage } from './mapa-colectivos.page';

describe('MapaColectivosPage', () => {
  let component: MapaColectivosPage;
  let fixture: ComponentFixture<MapaColectivosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaColectivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
