import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { ExpoService } from '../../services/expo.service';
import { ActivatedRoute } from '@angular/router';
import { ItemData } from '../../../shared/models/item-data';

@Component({
  selector: 'app-carousel-expo',
  templateUrl: './carousel-expo.component.html',
  styleUrls: ['./carousel-expo.component.scss'],
})
export class CarouselExpoComponent implements OnInit {
  /** Expo name */
  $expoName: Observable<string>;
  /** Expo description */
  $expoDescription: Observable<string>;
  /** Carousel data */
  $carouselData: Observable<ItemData[]>;
  /** Filters items */
  $filterItems: Observable<string[]>;

  /** Filters */
  selectedFilterSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  $selectedFilter = this.selectedFilterSubject.asObservable();
  selectedFilter: string[] = [];
  /** is th Data loading */
  loading: WritableSignal<boolean> = signal(false);
  /** Responsive option for carousel */
  responsiveOptions: any[] | undefined = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 2,
    },
  ];

  constructor(private expoService: ExpoService, route: ActivatedRoute) {
    this.$expoName = this.expoService.$expoName;
    this.$expoDescription = this.expoService.$expoDescription;
    /**  Handle the filter for carousel data */
    this.$carouselData = combineLatest([
      this.expoService.$items,
      this.$selectedFilter,
    ]).pipe(
      map(([items, filters]) => {
        if (filters.length > 0) {
          items = items.filter(
            (item) => item.tag && filters.includes(item.tag)
          );
        }
        return items;
      })
    );
    /** Init the filter items */
    this.$filterItems = this.expoService.$items.pipe(
      map((items) =>
        items
          .map((item) => item.tag ?? '')
          .filter((tag, index, tags) => tags.indexOf(tag) === index)
      )
    );
  }

  ngOnInit(): void {
    this.expoService.$items.subscribe((items) => console.warn('items', items));
    this.$carouselData.subscribe((carouselData) =>
      console.warn('carouselData', carouselData)
    );
    this.$expoName.subscribe((expoName) => console.warn('expoName', expoName));

    this.$filterItems.subscribe((items) => console.warn('items', items));
  }

  addFilter(filter: string): void {
    this.selectedFilter.push(filter);
  }

  removeFilter(filter: string): void {
    this.selectedFilter = this.selectedFilter.filter((f) => f !== filter);
  }

  toggleFilter(filter: string): void {
    if (filter === 'tous') {
      this.selectedFilter = [];
    } else if (this.selectedFilter.includes(filter)) {
      this.removeFilter(filter);
    } else {
      this.addFilter(filter);
    }
    this.selectedFilterSubject.next(this.selectedFilter);
  }
}
