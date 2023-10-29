import { Component, Input } from '@angular/core';
import { ItemMedia } from '../../../shared/models/item-data';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  styleUrls: ['./media-view.component.scss'],
})
export class MediaViewComponent {
  @Input() type: 'video' | 'audio' = 'video';
  @Input() media!: ItemMedia;
}
