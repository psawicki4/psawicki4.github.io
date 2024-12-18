import { AG_GRID_LOCALE_EN, AG_GRID_LOCALE_PL } from '@ag-grid-community/locale';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridApi, GridReadyEvent, GridState, StateUpdatedEvent } from 'ag-grid-community';
import { CardComponent } from "../../components/card/card.component";
import { LangService } from "../../services/lang.service";
import { CountriesStore } from "./countries.store";
import { GridService } from "./grid.service";
import { MatIcon } from '@angular/material/icon';
import { finalize } from 'rxjs';

@Component({
  selector: 'psa-grid',
  imports: [
    CardComponent,
    TranslatePipe,
    AgGridAngular,
    CommonModule,
    MatButton,
    MatIcon
  ],
  providers: [
    CountriesStore
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {

  gridService = inject(GridService);
  translate = inject(TranslateService);
  lang = inject(LangService);
  store = inject(CountriesStore);
  cd = inject(ChangeDetectorRef);
  outletRef = viewChild('outlet', { read: ViewContainerRef });
  contentRef = viewChild('content', { read: TemplateRef<any> });
  paginationPageSize = 12;
  paginationPageSizeSelector: number[] | boolean = [12, 25, 50];
  localeText: typeof AG_GRID_LOCALE_PL | typeof AG_GRID_LOCALE_EN = AG_GRID_LOCALE_PL;
  gridApi!: GridApi;
  initialState: GridState = {};
  portrait = window.matchMedia('(orientation: portrait)').matches;
  loading = true;
  colDefs: ColDef[] = [
    {
      headerValueGetter: this.headerTranslation('GRID.name'),
      field: "name.common",
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.capital'),
      valueGetter: p => Object.values(p.data.capital).join(', '),
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.region'),
      field: "region",
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.population'),
      field: "population",
      valueFormatter: p => p.value.toLocaleString(),
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.area'),
      field: "area",
      valueFormatter: p => p.value.toLocaleString() + ' km²',
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.languages'),
      valueGetter: p => Object.values(p.data.languages).join(', '),
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.unMember'),
      field: "unMember",
      filter: true,
      flex: 1
    },
  ];

  constructor() {
    this.getCountries();
    window.matchMedia('(orientation: portrait)').addEventListener('change', e => {
      this.portrait = e.matches;
      this.cd.markForCheck();
    });
    effect(() => {
      this.localeText = this.lang.lang() === 'pl' ? AG_GRID_LOCALE_PL : AG_GRID_LOCALE_EN;
      this.initialState = JSON.parse(localStorage.getItem('gridState') ?? '{}');
      this.outletRef()?.clear();
      this.outletRef()?.createEmbeddedView(this.contentRef()!);
    });
  }

  getCountries() {
    this.loading = true;
    this.gridService.getCountries()
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.store.setCountries(res);
      })
  }

  headerTranslation(translateKey: string) {
    return () => this.translate.instant(translateKey);
  }

  export() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  updateState(event: StateUpdatedEvent) {
    localStorage.setItem('gridState', JSON.stringify(event.state));
  }

  resetState() {
    localStorage.removeItem('gridState');
    this.initialState = {};
    this.outletRef()?.clear();
    this.outletRef()?.createEmbeddedView(this.contentRef()!);
  }
}
