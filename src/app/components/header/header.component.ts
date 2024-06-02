import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {LangSwitchComponent} from "../lang-switch/lang-switch.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {ContactDialogComponent} from "../contact-dialog/contact-dialog.component";

@Component({
  selector: 'psa-header',
  standalone: true,
    imports: [
        LangSwitchComponent,
        MatButton,
        MatIcon,
        MatIconButton,
        MatToolbar,
        TranslateModule
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  isMobile = input<boolean>(false);
  open = output();
  dialog = inject(MatDialog);

  onClick() {
    this.open.emit();
  }

  openContactDialog() {
    this.dialog.open(ContactDialogComponent, {autoFocus: false});
  }
}
