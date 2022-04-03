import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

export type ElevationLevel = '01dp' | '02dp' | '03dp' | '04dp' | '06dp' | '08dp' | '12dp' | '16dp' | '24dp'

@Component({
  selector: 'pw-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {

  @Input()
  level: ElevationLevel = '01dp';

  cardClass = '';

  constructor() { }

  ngOnInit(): void {
    switch (this.level) {
      case "02dp": {
        this.cardClass = 'card__02dp';
        break;
      }
      case "03dp": {
        this.cardClass = 'card__03dp'
        break;
      }
      case "04dp": {
        this.cardClass = 'card__04dp'
        break;
      }
      case "06dp": {
        this.cardClass = 'card__06dp'
        break;
      }
      case "08dp": {
        this.cardClass = 'card__08dp'
        break;
      }
      case "12dp": {
        this.cardClass = 'card__12dp'
        break;
      }
      case "16dp": {
        this.cardClass = 'card__16dp'
        break;
      }
      case "24dp": {
        this.cardClass = 'card__24dp'
        break;
      }
      default: {
        this.cardClass = 'card'
      }
    }
  }

}
