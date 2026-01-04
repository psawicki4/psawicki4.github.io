import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { TranslocoDirective } from "@jsverse/transloco";
import { ContactDialogComponent } from "../contact-dialog/contact-dialog.component";
import { LangSwitchComponent } from "../lang-switch/lang-switch.component";

@Component({
  selector: 'psa-header',
  imports: [
    LangSwitchComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    TranslocoDirective
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  open = output();
  dialog = inject(MatDialog);

  onClick() {
    this.open.emit();
  }

  openContactDialog() {
    this.dialog.open(ContactDialogComponent, { autoFocus: false });
  }
}
