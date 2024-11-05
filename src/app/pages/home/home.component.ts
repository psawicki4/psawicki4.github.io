import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { MatList, MatListItem } from "@angular/material/list";
import { TranslatePipe } from "@ngx-translate/core";
import { CardComponent } from "../../components/card/card.component";
import { NgClass } from '@angular/common';
import { IsMobileService } from '../../services/is-mobile.service';

@Component({
  selector: 'psa-home',
  standalone: true,
  imports: [
    CardComponent,
    MatList,
    MatListItem,
    MatAnchor,
    TranslatePipe,
    NgClass
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
