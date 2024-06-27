import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'psa-animations',
  standalone: true,
  imports: [],
  templateUrl: './animations.component.html',
  styleUrl: './animations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationsComponent {

}
