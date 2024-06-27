import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'psa-menu',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    TranslateModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

}
