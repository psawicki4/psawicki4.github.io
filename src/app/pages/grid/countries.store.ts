import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {Country} from "./country.type";

type CountriesState = {
  countries: Country[],
}

const initialState: CountriesState = {
  countries: []
}

export const CountriesStore = signalStore(
  withState(initialState),
  withMethods(store => ({
    setCountries(countries: Country[]) {
      patchState(store, {countries: countries})
    },
  }))
)
