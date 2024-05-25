import {ChangeDetectionStrategy, Component, input, InputSignal, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";

export type ElevationLevel = '01dp' | '02dp' | '03dp' | '04dp' | '06dp' | '08dp' | '12dp' | '16dp' | '24dp'

@Component({
  selector: 'psa-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  level = input<ElevationLevel>('01dp');

  cardClass = '';

  ngOnInit(): void {
    this.cardClass = 'card__' + this.level();
  }
}
