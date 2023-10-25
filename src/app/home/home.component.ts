/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { CardData } from '../shared/models/card-data';
import { EQUIPE } from './components/cards/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  path?: string = '/assets/background.jpg';
  files: string[] = ['test, test'];
  expositionName: string = 'Equipe de france de Rugby';
  cards: CardData[] = [];
  responsiveOptions: any[] | undefined = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 2,
    },
  ];
  loading: boolean = true;

  constructor(
    private router: Router,
    private electronService: ElectronService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.electronService.isElectron) {
      const result = await this.electronService.readdir();
      this.files = result;
      for (const file of this.files) {
        const itemData = await this.electronService.getItemData(file);
        this.cards.push(itemData);
      }
    } else {
      this.cards = [...EQUIPE];
    }
    this.loading = false;
  }
}
