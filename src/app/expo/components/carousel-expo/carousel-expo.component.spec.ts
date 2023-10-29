import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselExpoComponent } from './carousel-expo.component';

describe('CarouselExpoComponent', () => {
  let component: CarouselExpoComponent;
  let fixture: ComponentFixture<CarouselExpoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselExpoComponent]
    });
    fixture = TestBed.createComponent(CarouselExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
