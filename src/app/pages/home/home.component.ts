import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { MatList, MatListItem } from "@angular/material/list";
import { TranslatePipe } from "@ngx-translate/core";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'psa-home',
  standalone: true,
  imports: [
    CardComponent,
    MatList,
    MatListItem,
    MatAnchor,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
