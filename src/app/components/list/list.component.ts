import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  OnDestroy,
  output,
  viewChild
} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {filter, map, pairwise, Subscription, throttleTime} from "rxjs";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {NgClass, NgTemplateOutlet} from "@angular/common";
import {ListItemTemplateDirective} from "./list-item-template.directive";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'psa-list',
  standalone: true,
  imports: [
    CardComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    NgClass,
    NgTemplateOutlet,
    MatRipple
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements AfterViewInit, OnDestroy {

  subscription: Subscription | undefined;
  selectedItem: any;
  focusableIndex = 0;
  data = input<any[]>([]);
  itemHeight = input(0);
  fetchMore = output();
  selected = output<any>();
  listItemTemplateRef = contentChild(ListItemTemplateDirective);
  viewport = viewChild.required<CdkVirtualScrollViewport>('viewport');

  ngAfterViewInit() {
    this.subscription = this.viewport().elementScrolled().pipe(
      map(() => this.viewport().measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < this.itemHeight() * 2)),
      throttleTime(50)
    ).subscribe(() => {
        this.fetchMore.emit();
      }
    );
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selected.emit(item);
  }

  changeFocus(index: number) {
    const item = document.getElementById(index.toString());
    if (item) {
      item.focus();
      this.focusableIndex = index;
    }
  }

  trackBy(i: number) {
    return i;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
