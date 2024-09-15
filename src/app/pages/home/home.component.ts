import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {MatList, MatListItem} from "@angular/material/list";
import {MatAnchor} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

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

}
