import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {MatList, MatListItem} from "@angular/material/list";
import {MatAnchor} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {IsMobileService} from "../../services/is-mobile.service";

@Component({
  selector: 'psa-home',
  standalone: true,
  imports: [
    CardComponent,
    MatList,
    MatListItem,
    MatAnchor,
    TranslateModule
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
