import { Component, Input, OnInit } from '@angular/core';
import { ItemData } from '../../../shared/models/item-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss'],
})
export class CarouselCardComponent implements OnInit {
  @Input() itemData!: ItemData;
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.warn('CarouselCardComponent', this.itemData);
  }
  navigate(name: string): void {
    void this.router.navigate(['expo', name]);
  }
}
