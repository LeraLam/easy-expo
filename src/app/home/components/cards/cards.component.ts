import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() imgSrc!: string;
  @Input() title!: string;
  @Input() shortDescription!: string;

  constructor(private router: Router) {}

  navigate(name: string): void {
    void this.router.navigate(['/detail', name]);
  }
}
