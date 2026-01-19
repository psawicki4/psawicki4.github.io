import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardComponent } from '../../components/card/card.component';
import { HomeThreeComponent } from '../../components/home-three/home-three.component';

@Component({
  selector: 'psa-home',
  imports: [CardComponent, MatAnchor, TranslocoDirective, HomeThreeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
