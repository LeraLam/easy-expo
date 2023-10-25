import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData } from '../shared/models/card-data';
import { DUPONT, EQUIPE } from '../home/components/cards/data';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  name = '';
  description: string[] = [];
  imgSrc = '';
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name') ?? '';
    this.name = this.route.snapshot.paramMap.get('name') ?? '';
    if (!this.electronService.isElectron) {
      const item = EQUIPE.find((item) => item.title === this.name) ?? DUPONT;
      this.description = item.description?.split('\n') ?? [];
      this.imgSrc = item.imgSrc;
    } else {
      void this.electronService.getItemData(this.name).then((item) => {
        this.description = item.description?.split('\n') ?? [];
        this.imgSrc = item.imgSrc;
      });
    }
    this.loading = false;
  }

  back(): void {
    void this.router.navigate(['/home']);
  }
}
