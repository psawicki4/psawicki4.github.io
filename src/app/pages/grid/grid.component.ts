import { ChangeDetectionStrategy, Component, effect, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { GridService } from "./grid.service";
import { AgGridAngular } from "ag-grid-angular";
import { CountriesStore } from "./countries.store";
import { ColDef, GridApi, GridReadyEvent, GridState, RowSelectionOptions, StateUpdatedEvent } from 'ag-grid-community';
import { AG_GRID_LOCALE_EN, AG_GRID_LOCALE_PL } from '@ag-grid-community/locale';
import { LangService } from "../../services/lang.service";
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'psa-grid',
  standalone: true,
  imports: [
    CardComponent,
    TranslateModule,
    AgGridAngular,
    CommonModule,
    MatButton,
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
  outletRef = viewChild.required('outlet', { read: ViewContainerRef });
  contentRef = viewChild.required('content', { read: TemplateRef<any> });
  paginationPageSize = 12;
  paginationPageSizeSelector: number[] | boolean = [12, 25, 50];
  localeText = AG_GRID_LOCALE_PL;
  gridApi!: GridApi;
  initialState: GridState | undefined;
  colDefs: ColDef[] = [
    {
      headerValueGetter: this.headerTranslation('GRID.name'),
      field: "name.common",
      filter: true,
      flex: 1
    },
    {
      headerValueGetter: this.headerTranslation('GRID.capital'),
      field: "capital",
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
    effect(() => {
      this.localeText = this.lang.lang() === 'pl' ? AG_GRID_LOCALE_PL : AG_GRID_LOCALE_EN;
      this.initialState = JSON.parse(localStorage.getItem('gridState') ?? '{}');
      this.outletRef().clear();
      this.outletRef().createEmbeddedView(this.contentRef());
    });
  }

  getCountries() {
    this.gridService.getCountries().subscribe(res => {
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
}
