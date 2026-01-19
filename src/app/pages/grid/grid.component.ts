import { AG_GRID_LOCALE_EN, AG_GRID_LOCALE_PL } from '@ag-grid-community/locale';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AgGridAngular } from 'ag-grid-angular';
import {
  AllCommunityModule,
  ColDef,
  GridApi,
  GridReadyEvent,
  GridState,
  ModuleRegistry,
  StateUpdatedEvent,
  themeQuartz,
} from 'ag-grid-community';
import { finalize } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { LangService } from '../../services/lang.service';
import { CountriesStore } from './countries.store';
import { GridService } from './grid.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'psa-grid',
  imports: [CardComponent, TranslocoDirective, AgGridAngular, MatButton, MatIcon],
  providers: [CountriesStore],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  gridService = inject(GridService);
  transloco = inject(TranslocoService);
  lang = inject(LangService);
  store = inject(CountriesStore);
  outletRef = viewChild('outlet', { read: ViewContainerRef });
  contentRef = viewChild.required('content', { read: TemplateRef<any> });
  theme = themeQuartz.withParams({
    backgroundColor: '#242424',
    foregroundColor: '#e0e3e2',
    accentColor: '#00dddd',
    fontFamily: ['Open Sans', 'Open Sans fallback', 'sans-serif'],
  });
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  localeText: typeof AG_GRID_LOCALE_PL | typeof AG_GRID_LOCALE_EN = AG_GRID_LOCALE_PL;
  gridApi!: GridApi;
  initialState: GridState = {};
  portrait = signal(false);
  loading = true;
  colDefs: ColDef[] = [
    {
      headerValueGetter: this.headerTranslation('GRID.name'),
      field: 'name.common',
      filter: true,
      flex: 1,
    },
    {
      headerValueGetter: this.headerTranslation('GRID.capital'),
      valueGetter: (p) => Object.values(p.data.capital).join(', '),
      filter: true,
      flex: 1,
    },
    {
      headerValueGetter: this.headerTranslation('GRID.region'),
      field: 'region',
      filter: true,
      flex: 1,
    },
    {
      headerValueGetter: this.headerTranslation('GRID.population'),
      field: 'population',
      valueFormatter: (p) => p.value.toLocaleString(),
      filter: true,
      flex: 1,
    },
    {
      headerValueGetter: this.headerTranslation('GRID.area'),
      field: 'area',
      valueFormatter: (p) => p.value.toLocaleString() + ' km²',
      filter: true,
      flex: 1,
    },
    {
      headerValueGetter: this.headerTranslation('GRID.languages'),
      valueGetter: (p) => Object.values(p.data.languages).join(', '),
      filter: true,
      flex: 1,
    },
    {
      headerValueGetter: this.headerTranslation('GRID.unMember'),
      field: 'unMember',
      filter: true,
      flex: 1,
    },
  ];

  constructor() {
    this.getCountries();
    afterNextRender(() => {
      const mql = globalThis.matchMedia('(orientation: portrait)');
      this.portrait.set(mql.matches);
      mql.addEventListener('change', (e) => {
        this.portrait.set(e.matches);
      });
      this.initialState = JSON.parse(localStorage.getItem('gridState') ?? '{}');
    });
    effect(() => {
      this.localeText = this.lang.lang() === 'pl' ? AG_GRID_LOCALE_PL : AG_GRID_LOCALE_EN;
      this.outletRef()?.clear();
      this.outletRef()?.createEmbeddedView(this.contentRef());
    });
  }

  getCountries() {
    this.loading = true;
    this.gridService
      .getCountries()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.store.setCountries(res);
      });
  }

  headerTranslation(translateKey: string) {
    return () => this.transloco.translate(translateKey);
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
    this.outletRef()?.createEmbeddedView(this.contentRef());
  }
}
