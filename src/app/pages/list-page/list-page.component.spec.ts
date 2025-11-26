import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ListPageComponent } from './list-page.component';
import { RoomsStore } from './rooms.store';
import { Room } from './room.type';
import { vi, expect } from 'vitest';
import { TranslocoTestingModule } from '@jsverse/transloco/testing';

class MockRoomsStore {
  rooms = signal<{ total: number, data: Room[] }>({ total: 0, data: [] });
  selectedRoom = signal<Room>({ roomNumber: 0, booked: false });
  setRooms!: () => void;
  patchRooms!: () => void;
  patchSelectedRoom!: () => void;
  bookedRooms = signal<Room[]>([]);
}

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let store: InstanceType<typeof RoomsStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListPageComponent, TranslocoTestingModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        { provide: RoomsStore, useClass: MockRoomsStore }
      ]
    });

    const fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(RoomsStore);

    store.setRooms = vi.fn();
    store.patchRooms = vi.fn();
    store.patchSelectedRoom = vi.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get first rooms on init', () => {
    const getFirstRoomsSpy = vi.spyOn(component, 'getFirstRooms');
    component.ngOnInit();
    expect(getFirstRoomsSpy).toHaveBeenCalled();
  });

  it('should set first rooms in store', () => {
    component.getFirstRooms();
    expect(store.setRooms).toHaveBeenCalledWith({ total: 10000, data: component.allRooms.slice(0, 50) });
  });

  it('should fetch more rooms', () => {
    component.skip = 0;
    (store.rooms as any).set({ total: 10000, data: [] });
    component.fetchMoreRooms();
    expect(component.skip).toBe(50);
    expect(store.patchRooms).toHaveBeenCalledWith(component.allRooms.slice(50, 100));
  });

  it('should not fetch more rooms if all are loaded', () => {
    (store.rooms as any).set({ total: 10000, data: new Array(10000) });
    component.fetchMoreRooms();
    expect(store.patchRooms).not.toHaveBeenCalled();
  });

  it('should select a room', () => {
    const room: Room = { roomNumber: 101, booked: false };
    component.selectRoom(room);
    expect(store.patchSelectedRoom).toHaveBeenCalledWith(room);
  });

  it('should not select a room if room is not provided', () => {
    component.selectRoom(null as any);
    expect(store.patchSelectedRoom).not.toHaveBeenCalled();
  });

  it('should cancel selection', () => {
    component.cancel();
    expect(store.patchSelectedRoom).toHaveBeenCalledWith({ roomNumber: 0, booked: false });
  });

  it('should book a room', () => {
    const roomToBook: Room = { roomNumber: 1, booked: false };
    (store.selectedRoom as any).set(roomToBook);
    const initialRooms = { total: 10000, data: [{ ...roomToBook }] };
    (store.rooms as any).set(initialRooms);
    component.book();
    const updatedRooms = { ...initialRooms };
    updatedRooms.data[0].booked = true;
    expect(store.setRooms).toHaveBeenCalledWith(updatedRooms);
    expect(store.patchSelectedRoom).toHaveBeenCalledWith({ roomNumber: 0, booked: false });
  });

  it('should delete a reservation', () => {
    const roomToUnbook: Room = { roomNumber: 1, booked: true };
    (store.selectedRoom as any).set(roomToUnbook);
    const initialRooms = { total: 10000, data: [{ ...roomToUnbook }] };
    (store.rooms as any).set(initialRooms);
    component.deleteReservation();
    const updatedRooms = { ...initialRooms };
    updatedRooms.data[0].booked = false;
    expect(store.setRooms).toHaveBeenCalledWith(updatedRooms);
    expect(store.patchSelectedRoom).toHaveBeenCalledWith({ roomNumber: 0, booked: false });
  });
});
