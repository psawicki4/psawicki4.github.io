import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent} from "@angular/forms";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DemoForm} from "./form.interface";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {JsonPipe} from "@angular/common";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'psa-form',
  standalone: true,
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatError,
    JsonPipe,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatCheckbox,
    MatButton,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit{

  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  maxDate = new Date();

  form = new FormGroup<DemoForm>({
    petType: new FormControl('', {nonNullable: true})
  });

  ngOnInit(): void {
    this.form.get('petType')?.events.subscribe(e => {
        if (e instanceof ValueChangeEvent && e.value === 'dog') {
          this.snackBar.open('Wybierz lepiej kota', 'No dobrze...', {
            duration: 5000
          });
          this.removeCatForm();
        } else if (e instanceof ValueChangeEvent && e.value === 'cat') {
          this.addCatForm();
        }
    });
  }

  private addCatForm() {
    this.form.addControl('cat', this.fb.group({
     name: ['', Validators.required],
      age: [null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(0), Validators.max(99)]],
      birthday: [null],
      castrated: [false, Validators.required]
    }));
  }

  private removeCatForm() {
    this.form.removeControl('cat');
  }

  get petType() {
    return this.form.get('petType')?.value;
  }

}
