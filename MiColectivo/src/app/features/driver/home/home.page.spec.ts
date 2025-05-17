import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverHomePage } from './home.page';

describe('DriverHomePage', () => {
  let component: DriverHomePage;
  let fixture: ComponentFixture<DriverHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
