import { ResolveFn } from '@angular/router';
import { ExpoService } from '../services/expo.service';
import { inject } from '@angular/core';

export const expoResolver: ResolveFn<void> = async (route, state) => {
  const expoService = inject(ExpoService);
  expoService.initExpo();
};
