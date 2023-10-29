import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCardComponent } from './carousel-card.component';

describe('CarouselCardComponent', () => {
  let component: CarouselCardComponent;
  let fixture: ComponentFixture<CarouselCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselCardComponent]
    });
    fixture = TestBed.createComponent(CarouselCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
