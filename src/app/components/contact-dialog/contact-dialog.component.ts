import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { TranslatePipe } from "@ngx-translate/core";
import { ReverseMailDirective } from "./reverse-mail.directive";

@Component({
  selector: 'psa-contact-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    TranslatePipe,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatAnchor,
    ReverseMailDirective
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDialogComponent {

}
