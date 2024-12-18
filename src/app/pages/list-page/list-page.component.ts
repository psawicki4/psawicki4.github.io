import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { TranslatePipe } from "@ngx-translate/core";
import { CardComponent } from "../../components/card/card.component";
import { ListItemTemplateDirective } from "../../components/list/list-item-template.directive";
import { ListComponent } from "../../components/list/list.component";
import { Room } from "./room.type";
import { RoomsStore } from "./rooms.store";

@Component({
    selector: 'psa-list-page',
    imports: [
        CardComponent,
        ListComponent,
        ListItemTemplateDirective,
        TranslatePipe,
        NgClass,
        MatButton
    ],
    providers: [RoomsStore],
    templateUrl: './list-page.component.html',
    styleUrl: './list-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {

  store = inject(RoomsStore);
  skip = 0;
  allRooms = Array.from({ length: 10000 }, (value, index): Room => ({
    roomNumber: index + 1,
    booked: false
  }));

  ngOnInit(): void {
    this.getFirstRooms();
  }

  getFirstRooms() {
    this.skip = 0;
    const firstRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.store.setRooms({ total: 10000, data: firstRooms });
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
    updatedRooms.data[this.store.selectedRoom().roomNumber - 1].booked = true;
    this.store.setRooms(updatedRooms);
    this.cancel();
  }

  deleteReservation() {
    const updatedRooms = { ...this.store.rooms() };
    updatedRooms.data[this.store.selectedRoom().roomNumber - 1].booked = false;
    this.store.setRooms(updatedRooms);
    this.cancel();
  }
}
