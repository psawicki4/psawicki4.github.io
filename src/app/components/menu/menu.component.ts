import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListItem, MatNavList } from "@angular/material/list";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'psa-menu',
  standalone: true,
  imports: [
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

}
