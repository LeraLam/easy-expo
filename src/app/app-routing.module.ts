import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { ExpoRoutingModule } from './expo/expo-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'expo',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {}), ExpoRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
