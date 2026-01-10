import { ENTER } from "@angular/cdk/keycodes";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from "@angular/forms";
import { provideLuxonDateAdapter } from "@angular/material-luxon-adapter";
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from "@angular/material/autocomplete";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow } from "@angular/material/chips";
import { DateAdapter } from "@angular/material/core";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatSlider, MatSliderThumb } from "@angular/material/slider";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslocoDirective, TranslocoService } from "@jsverse/transloco";
import dayjs from "dayjs";
import { Subject, take, takeUntil } from "rxjs";
import { CardComponent } from "../../components/card/card.component";
import { LangService } from "../../services/lang.service";
import { ageBirthdayValidator } from "./age-birthday-validator";
import { CatOption, DemoForm } from "./form.type";
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
    TranslocoDirective
  ],
  providers: [
    provideLuxonDateAdapter({
      parse: {
        dateInput: 'yyyy-MM-dd',
      },
      display: {
        dateInput: 'yyyy-MM-dd',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM-yyyy',
      },
    })
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  transloco = inject(TranslocoService);
  langService = inject(LangService);
  dateAdapter = inject(DateAdapter);
  dialog = inject(MatDialog);
  destroy$ = new Subject<void>();
  maxDate = new Date();
  options: CatOption[] = [{ namePl: 'Kot Sfinks', nameEN: 'Sphynx Cat', id: 'kot_sfinks' }, { namePl: 'Kot Syberyjski', nameEN: 'Siberian Cat', id: 'kot_syberyjski' },
  { namePl: 'Kot Norweski Leśny', nameEN: 'Norwegian Forest Cat', id: 'kot_norweski_lesny' }, { namePl: 'Kot Bengalski', nameEN: 'Bengal Cat', id: 'kot_bengalski' },
  { namePl: 'Kot Syjamski', nameEN: 'Siamese Cat', id: 'kot_syjamski' }, { namePl: 'Ragdoll', nameEN: 'Ragdoll Cat', id: 'ragdoll' },
  { namePl: 'Kot Rosyjski Niebieski', nameEN: 'Russian Blue Cat', id: 'kot_rosyjski_niebieski' }, { namePl: 'Kot Perski', nameEN: 'Persian Cat', id: 'kot_perski' },
  { namePl: 'Maine Coon', nameEN: 'Maine Coon Cat', id: 'maine_coon' }, { namePl: 'Kot Brytyjski', nameEN: 'British Shorthair Cat', id: 'kot_brytyjski' },
  { namePl: 'Inny', nameEN: 'Other', id: 'inny' }];
  filteredOptions: CatOption[] = [];
  toys = signal<string[]>([]);
  separatorKeysCodes = [ENTER];
  bredInput = viewChild<ElementRef>('bred');

  form = new FormGroup<DemoForm>({
    petType: new FormControl('', { nonNullable: true })
  });

  constructor() {
    this.filteredOptions = this.options.slice();
    this.destroy$.pipe(takeUntilDestroyed());
    this.form.get('petType')?.events.pipe(takeUntilDestroyed()).subscribe(e => {
      if (e instanceof ValueChangeEvent && e.value === 'dog') {
        this.removeCatForm();
        this.dialog.open(DogDialog);
        this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
          this.selectCat();
        });
      } else if (e instanceof ValueChangeEvent && e.value === 'cat') {
        this.addCatForm();
      }
    });
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    effect(() => {
      this.setLocale(this.langService.lang());
    });
  }

  private addCatForm() {
    this.form.addControl('cat', this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      birthday: [null],
      description: ['', Validators.maxLength(200)],
      purebred: [false, Validators.required],
      toys: [[]],
      beauty: [5, Validators.min(5)],
      malice: [0],
    }, { validators: [ageBirthdayValidator()] }
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
        if (this.age) {
          this.age.setValue(dayjs().diff(e.value, 'year'));
        }
      }
    })
  }

  selectCat() {
    this.form.get('petType')?.setValue('cat');
  }

  private addBred() {
    this.cat?.addControl('bred', new FormControl('', [Validators.required]));
  }

  private removeBred() {
    this.cat?.removeControl('bred');
  }

  filterBred() {
    const filterValue = this.bredInput()?.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.namePl.toLocaleLowerCase().includes(filterValue) || o.nameEN.toLocaleLowerCase().includes(filterValue));
  }

  displayFn(id: string): string {
    const catOption = this.options.find(o => o.id === id);
    if (!catOption) {
      return '';
    }
    return this.langService.lang() === 'pl' ? catOption.namePl : catOption.nameEN;
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
    this.cat?.get('toys')?.setValue(this.toys());
  }

  addToy(event: MatChipInputEvent): void {
    const value = (event.value ?? '').trim();
    if (value) {
      this.toys.update(toys => [...toys, value]);
      this.cat?.get('toys')?.setValue(this.toys());
    }
    event.chipInput!.clear();
  }

  reset() {
    this.removeCatForm();
    this.form.reset();
  }

  private removeCatForm() {
    this.destroy$.next();
    this.toys.set([]);
    this.form.removeControl('cat');
  }

  check() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.snackBar.open(this.transloco.translate('FORM.valid-form', { value: this.name?.value }),
        this.transloco.translate('FORM.ok'), {
        duration: 5000,
        panelClass: 'success-snackbar'
      });
    } else {
      this.snackBar.open(this.transloco.translate('FORM.invalid-form', { value: this.name?.value }),
        this.transloco.translate('FORM.ok'), {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
    }
  }

  private setLocale(lang: string) {
    this.dateAdapter.setLocale(lang);
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

}

@Component({
  selector: 'dog-dialog',
  templateUrl: 'dog-dialog.html',
  imports: [MatDialogModule, MatButton, TranslocoDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogDialog { }