import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { CarouselExpoComponent } from './components/carousel-expo/carousel-expo.component';
import { ReactiveFormsModule } from '@angular/forms';

/** PrimeNg */
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { ExpoRoutingModule } from './expo-routing.module';
import { CarouselCardComponent } from './components/carousel-card/carousel-card.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { AutoFocusModule } from 'primeng/autofocus';
import { ChipModule } from 'primeng/chip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FilterChipComponent } from './components/filter-chip/filter-chip.component';
import { PanelModule } from 'primeng/panel';
import { MediaViewComponent } from './components/media-view/media-view.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ExpoRoutingModule,
    SharedModule,
    ImageModule,
    CarouselModule,
    ButtonModule,
    ProgressSpinnerModule,
    AutoFocusModule,
    ChipModule,
    RadioButtonModule,
    ReactiveFormsModule,
    PanelModule,
  ],
  declarations: [
    CarouselExpoComponent,
    CarouselCardComponent,
    ItemDetailComponent,
    FilterChipComponent,
    MediaViewComponent,
  ],
})
export class ExpoModule {}
