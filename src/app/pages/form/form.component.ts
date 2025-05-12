import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from "@angular/material/chips";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatSlider, MatSliderThumb } from "@angular/material/slider";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import dayjs from "dayjs";
import { Subject, takeUntil } from "rxjs";
import { CardComponent } from "../../components/card/card.component";
import { IsMobileService } from "../../services/is-mobile.service";
import { ageBirthdayValidator } from "./age-birthday-validator";
import { DemoForm } from "./form.type";
import { OnlyDigitsDirective } from "./only-digits.directive";

@Component({
    selector: 'psa-form',
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
        CdkTextareaAutosize,
        OnlyDigitsDirective,
        MatSlider,
        MatSliderThumb,
        MatChipGrid,
        MatChipRow,
        MatIcon,
        MatChipInput,
        MatChipRemove,
        TranslatePipe,
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  translate = inject(TranslateService);
  isMobileService = inject(IsMobileService);
  destroy$ = new Subject<void>();
  maxDate = new Date();
  //todo: przetłumaczyć jakoś
  options: string[] = ['Kot sfinks', ' Kot syberyjski', 'Kot norweski leśny', 'Kot bengalski', 'Kot syjamski', 'Ragdoll',
    'Kot rosyjski niebieski', 'Kot perski', 'Maine Coon', 'Kot brytyjski', 'inny'];
  filteredOptions: string[];
  toys = signal<string[]>([]);
  separatorKeysCodes = [ENTER, COMMA];
  bredInput = viewChild<ElementRef>('bred');

  form = new FormGroup<DemoForm>({
    petType: new FormControl('', {nonNullable: true})
  });

  constructor() {
    this.filteredOptions = this.options.slice();
    this.destroy$.pipe(takeUntilDestroyed());
    this.form.get('petType')?.events.pipe(takeUntilDestroyed()).subscribe(e => {
      if (e instanceof ValueChangeEvent && e.value === 'dog') {
        this.snackBar.open(this.translate.instant('FORM.choose-cat'), this.translate.instant('FORM.choose-cat__btn'), {
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
        age: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
        birthday: [null],
        description: ['', Validators.maxLength(200)],
        sterilized: [false, Validators.required],
        purebred: [false, Validators.required],
        toys: [[]],
        beauty: [5, Validators.min(5)],
        malice: [0],
      }, {validators: [ageBirthdayValidator()]}
    ));
    this.cat?.get('purebred')?.events.pipe(takeUntil(this.destroy$)).subscribe(e => {
      if (e instanceof ValueChangeEvent && e.value === true) {
        this.addBred();
      } else if (e instanceof ValueChangeEvent && e.value === false) {
        this.removeBred();
      }
    })
    this.cat?.get('birthday')?.events.pipe(takeUntil(this.destroy$)).subscribe(e => {
      if (e instanceof ValueChangeEvent && e.value) {
        if (this.age && !this.age.value) {
          this.age.setValue(dayjs().diff(e.value, 'year'));
        }
      }
    })
  }

  private removeCatForm() {
    this.destroy$.next();
    this.form.removeControl('cat');
  }

  private addBred() {
    this.cat?.addControl('bred', new FormControl('', [Validators.required]));
  }

  private removeBred() {
    this.cat?.removeControl('bred');
  }

  filterBred() {
    const filterValue = this.bredInput()?.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }


  removeToy(toy: string) {
    this.toys.update(toys => {
      const index = toys.indexOf(toy);
      if (index < 0) {
        return toys;
      }
      toys.splice(index, 1);
      return [...toys];
    });
  }

  addToy(event: MatChipInputEvent): void {
    const value = (event.value ?? '').trim();
    if (value) {
      this.toys.update(toys => [...toys, value]);
    }
    event.chipInput!.clear();
  }

  reset() {
    this.removeCatForm();
    this.form.reset();
  }

  check() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.snackBar.open(this.translate.instant('FORM.valid-form', {value: this.name?.value}),
        this.translate.instant('FORM.ok'), {
          duration: 5000,
          panelClass: 'success-snackbar'
        });
    } else {
      this.snackBar.open(this.translate.instant('FORM.invalid-form', {value: this.name?.value}),
        this.translate.instant('FORM.ok'), {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
    }
  }

  get cat() {
    return this.form.controls['cat'];
  }

  get name() {
    return this.cat?.get('name');
  }

  get age() {
    return this.cat?.get('age');
  }

  get beauty() {
    return this.cat?.get('beauty');
  }

  get descriptionVal() {
    return this.cat?.get('description')?.value;
  }

  get isMobile() {
    return this.isMobileService.isMobile();
  }

}
