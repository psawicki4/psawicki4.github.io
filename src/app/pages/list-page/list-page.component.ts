import {ChangeDetectionStrategy, Component, computed, OnInit, signal} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ListComponent} from "../../components/list/list.component";
import {ListItemTemplateDirective} from "../../components/list/list-item-template.directive";
import {Room, RoomsList} from "./room.interface";
import {TranslateModule} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'psa-list-page',
  standalone: true,
  imports: [
    CardComponent,
    ListComponent,
    ListItemTemplateDirective,
    TranslateModule,
    NgClass,
    MatButton
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {

  rooms = signal<RoomsList>({total: 0, data: []});
  bookedRooms = computed(() => this.rooms().data.filter(i => i.booked));
  selectedRoom = signal<Room>({roomNumber: 0, booked: false})
  skip = 0;
  allRooms = Array.from({length: 10000}, (value, index): Room => ({
    roomNumber: index + 1,
    booked: false
  }));

  ngOnInit(): void {
    this.getFirstRooms();
  }

  getFirstRooms() {
    this.skip = 0;
    const firstRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.rooms.set({total: 10000, data: firstRooms});
  }

  fetchMoreRooms() {
    if (this.rooms().data.length === this.rooms().total) {
      return;
    }
    this.skip += 50;
    const nextRooms = this.allRooms.slice(this.skip, this.skip + 50);
    const totalRooms = {total: 10000, data: [...this.rooms().data, ...nextRooms]};
    this.rooms.set(totalRooms);
  }

  selectRoom(selectedRoom: Room) {
    if (selectedRoom) {
      this.selectedRoom.set(selectedRoom);
    }
  }

  cancel() {
    this.selectedRoom.set({roomNumber: 0, booked: false});
  }

  book() {
    const updatedRooms = {...this.rooms()};
    updatedRooms.data[this.selectedRoom()?.roomNumber - 1].booked = true;
    this.rooms.set(updatedRooms);
    this.cancel();
  }

  deleteReservation() {
    const updatedRooms = {...this.rooms()};
    updatedRooms.data[this.selectedRoom()?.roomNumber - 1].booked = false;
    this.rooms.set(updatedRooms);
    this.cancel();
  }
}
