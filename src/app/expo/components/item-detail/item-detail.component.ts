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
  active = true;
  imageSrcs: string[] = [];
  srcView = '';

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
        const item = items.filter((item) => item.title === params.itemName)[0];
        console.warn('items', item);
        this.srcView = item.thumbnailSrc;
        this.imageSrcs.push(item.thumbnailSrc);
        if (item.image?.src) {
          this.imageSrcs.push(`data:image/jpeg;base64,${item.image?.src}`);
        }
        console.warn('imageSrcs', this.imageSrcs);
        if (this.imageSrcs.length > 1) {
          console.warn('setInterval');
          setInterval(() => {
            console.warn('srcView', this.active, this.srcView.substring(0, 30));
            this.active = false;
          }, 4000);
        }
        return item;
      })
    );
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  back(): void {
    void this.router.navigate(['/expo']);
  }

  onTransitionEnd() {
    if (!this.active) {
      this.srcView = this.imageSrcs.filter((src) => src !== this.srcView)[0];
      this.active = true;
    }
  }
}
