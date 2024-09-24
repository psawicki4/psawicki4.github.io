import {ChangeDetectionStrategy, Component, inject, OnInit, viewChild} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GridService} from "./grid.service";
import {AgGridAngular} from "ag-grid-angular";
import {CountriesStore} from "./countries.store";
import {ColDef} from 'ag-grid-community';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AG_GRID_LOCALE_PL} from '@ag-grid-community/locale';
import {LangService} from "../../services/lang.service";

@Component({
  selector: 'psa-grid',
  standalone: true,
  imports: [
    CardComponent,
    TranslateModule,
    AgGridAngular,
  ],
  providers: [
    CountriesStore
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {

  gridService = inject(GridService);
  translate = inject(TranslateService);
  lang = inject(LangService);
  store = inject(CountriesStore);
  grid = viewChild.required<AgGridAngular>('grid');
  paginationPageSize = 12;
  paginationPageSizeSelector: number[] | boolean = [12, 25, 50];
  localeText = AG_GRID_LOCALE_PL;
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

//km²
  constructor() {
    this.translate.onLangChange.pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.grid().api.refreshHeader()
      });
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.gridService.getCountries().subscribe(res => {
      this.store.setCountries(res);
    })
  }

  headerTranslation(translateKey: string) {
    return () => this.translate.instant(translateKey);
  }
}
