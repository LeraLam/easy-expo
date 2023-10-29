import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { ExpoService } from '../../services/expo.service';
import { ItemData } from '../../../shared/models/item-data';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {
  $itemData!: Observable<ItemData>;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expoService: ExpoService
  ) {
    this.$itemData = combineLatest([
      route.params,
      this.expoService.$items,
    ]).pipe(
      map(([params, items]) => {
        return items.filter((item) => item.title === params.itemName)[0];
      })
    );
  }

  back(): void {
    void this.router.navigate(['/expo']);
  }
}
