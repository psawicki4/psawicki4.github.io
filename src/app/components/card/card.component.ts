import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'psa-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

}
