import { Room, RoomsList } from './room.type';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed } from '@angular/core';

type RoomsState = {
  rooms: RoomsList;
  selectedRoom: Room;
};

const initialState: RoomsState = {
  rooms: { total: 0, data: [] },
  selectedRoom: { roomNumber: 0, booked: false },
};

export const RoomsStore = signalStore(
  withState(initialState),
  withComputed(({ rooms }) => ({
    bookedRooms: computed(() => rooms().data.filter((i) => i.booked)),
  })),
  withMethods((store) => ({
    setRooms(rooms: RoomsList) {
      patchState(store, { rooms: rooms });
    },
    patchRooms(nextRooms: Room[]) {
      patchState(store, (state) => ({
        rooms: { total: 10000, data: [...state.rooms.data, ...nextRooms] },
      }));
    },
    patchSelectedRoom(selectedRoom: Room) {
      patchState(store, { selectedRoom });
    },
  }))
);
