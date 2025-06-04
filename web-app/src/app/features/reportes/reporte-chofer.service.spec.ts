import { TestBed } from '@angular/core/testing';

import { ReporteChoferService } from './reporte-chofer.service';

describe('ReporteChoferService', () => {
  let service: ReporteChoferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteChoferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
