import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteChoferPage } from './reporte-chofer.page';

describe('ReporteChoferPage', () => {
  let component: ReporteChoferPage;
  let fixture: ComponentFixture<ReporteChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
