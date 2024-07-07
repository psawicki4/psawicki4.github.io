import {Room, RoomsList} from "./room.type";
import {signalStore, withComputed, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

type RoomsState = {
  rooms: RoomsList,
  selectedRoom: Room
}

const initialState: RoomsState = {
  rooms: {total: 0, data: []},
  selectedRoom: {roomNumber: 0, booked: false}
}

export const RoomsStore = signalStore(
  withState(initialState),
  withComputed(({rooms}) => ({
    bookedRooms: computed(() => rooms().data.filter(i => i.booked))
  }))
)
