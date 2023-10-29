import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { expoResolver } from './resolvers/expo.resolver';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { CarouselExpoComponent } from './components/carousel-expo/carousel-expo.component';

export enum EnumExpoRoute {
  MENU = 'expo',
  CAROUSEL = 'expo/:menuItem',
  DETAIL = 'detail/:itemName',
}

const routes: Routes = [
  {
    path: 'expo',
    component: CarouselExpoComponent,
    resolve: {
      expoResolver,
    },
  },

  {
    path: 'expo/:itemName',
    component: ItemDetailComponent,
    resolve: {
      expoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpoRoutingModule {}
