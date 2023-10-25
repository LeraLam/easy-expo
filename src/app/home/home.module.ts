import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

/** PrimeNg */
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CardsComponent } from './components/cards/cards.component';

@NgModule({
  declarations: [HomeComponent, CardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    ImageModule,
    CarouselModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
})
export class HomeModule {}
