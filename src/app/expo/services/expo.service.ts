import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElectronService } from '../../core/services';
import { ItemData } from '../../shared/models/item-data';

@Injectable({
  providedIn: 'root',
})
export class ExpoService {
  $expoName: Observable<string> = new Observable<string>();
  $expoDescription: Observable<string> = new Observable<string>();
  $items: Observable<ItemData[]> = new Observable<ItemData[]>();
  isExpoInitilized: WritableSignal<boolean> = signal(false);

  constructor(private ElectronService: ElectronService) {}

  initExpo(): void {
    if (!this.isExpoInitilized()) {
      console.warn('initExpo');
      this.$items = from(this.ElectronService.initExpoData()).pipe(
        map((items) =>
          items.map((item) => {
            const prefixedItem = {
              ...item,
              thumbnailSrc: `data:image/jpeg;base64,${item.thumbnailSrc}`,
            };
            if (prefixedItem.audio?.src) {
              prefixedItem.audio.src = `data:audio/mp3;base64,${prefixedItem.audio.src}`;
            }
            if (prefixedItem.video?.src) {
              prefixedItem.video.src = `data:video/mp4;base64,${prefixedItem.video.src}`;
            }
            return prefixedItem;
          })
        )
      );
      this.$expoName = from(this.ElectronService.readUTFFile('expoName.txt'));
      this.$expoDescription = from(
        this.ElectronService.readUTFFile('description.txt')
      );
      this.isExpoInitilized.set(true);
    }
  }
}
