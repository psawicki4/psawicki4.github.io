import {ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, viewChild} from '@angular/core';
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
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";

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
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {

  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  maxDate = new Date();
  options: string[] = ['Kot sfinks', ' Kot syberyjski', 'Kot norweski leśny', 'Kot bengalski', 'Kot syjamski', 'Ragdoll',
    'Kot rosyjski niebieski', 'Kot perski', 'Maine Coon', 'Kot brytyjski', 'inny'];
  filteredOptions: string[];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  bred = viewChild<ElementRef>('bred');

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
      castrated: [false, Validators.required],
      purebred: [false, Validators.required],
    }));
    this.cat.get('purebred')?.events.subscribe(e => {
      if (e instanceof ValueChangeEvent && e.value === true) {
        this.addBred();
      } else if (e instanceof ValueChangeEvent && e.value === false) {
        this.removeBred();
      }
    })
  }

  private removeCatForm() {
    this.form.removeControl('cat');
  }

  private addBred() {
    this.cat?.addControl('bred', new FormControl('', [Validators.required]));
  }

  private removeBred() {
    this.cat?.removeControl('bred');
  }

  filterBred(): void {
    const filterValue = this.bred()?.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  get petType() {
    return this.form.get('petType')?.value;
  }

  get cat() {
    return this.form.get('cat') as FormGroup;
  }

}
