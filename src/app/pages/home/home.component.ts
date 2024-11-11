import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { TranslatePipe } from "@ngx-translate/core";
import { CardComponent } from "../../components/card/card.component";
import { IsMobileService } from '../../services/is-mobile.service';

@Component({
  selector: 'psa-home',
  standalone: true,
  imports: [
    CardComponent,
    MatAnchor,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  isMobileService = inject(IsMobileService);

  get isMobile() {
    return this.isMobileService.isMobile();
  }
}
