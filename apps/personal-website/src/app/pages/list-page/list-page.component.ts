import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardComponent } from '../../components/card/card.component';
import { ListItemTemplateDirective } from '../../components/list/list-item-template.directive';
import { ListComponent } from '../../components/list/list.component';
import { Room } from './room.type';
import { RoomsStore } from './rooms.store';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'psa-list-page',
  imports: [CardComponent, ListComponent, ListItemTemplateDirective, TranslocoDirective, NgClass, MatButton, MatIconButton, MatIcon],
  providers: [RoomsStore],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit {
  store = inject(RoomsStore);
  skip = 0;
  allRooms = Array.from(
    { length: 10000 },
    (value, index): Room => ({
      roomNumber: index + 1,
      booked: false,
    })
  ).filter((i) => i.roomNumber !== 404);

  ngOnInit(): void {
    this.getFirstRooms();
  }

  getFirstRooms() {
    this.skip = 0;
    const firstRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.store.setRooms({ total: 9999, data: firstRooms });
  }

  fetchMoreRooms() {
    if (this.store.rooms().data.length === this.store.rooms().total) {
      return;
    }
    this.skip += 50;
    const nextRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.store.patchRooms(nextRooms);
  }

  selectRoom(selectedRoom: Room) {
    if (selectedRoom) {
      this.store.patchSelectedRoom(selectedRoom);
    }
  }

  cancel() {
    this.store.patchSelectedRoom({ roomNumber: 0, booked: false });
  }

  book() {
    const updatedRooms = { ...this.store.rooms() };
    console.log(this.store.selectedRoom().roomNumber);
    const index = updatedRooms.data.findIndex((r) => r.roomNumber === this.store.selectedRoom().roomNumber);
    if (index !== -1) {
      updatedRooms.data[index].booked = true;
    }
    this.store.setRooms(updatedRooms);
    this.cancel();
  }

  deleteReservation(selectedRoomNumber: number) {
    const updatedRooms = { ...this.store.rooms() };
    const index = updatedRooms.data.findIndex((r) => r.roomNumber === selectedRoomNumber);
    if (index !== -1) {
      updatedRooms.data[index].booked = false;
    }
    this.store.setRooms(updatedRooms);
    this.cancel();
  }
}
