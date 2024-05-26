import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass} from "@angular/common";

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
export class CardComponent {

}
