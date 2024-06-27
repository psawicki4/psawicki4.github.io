import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {ListComponent} from "../../components/list/list.component";
import {ListItemTemplateDirective} from "../../components/list/list-item-template.directive";
import {Room, RoomsList} from "./room.interface";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'psa-list-page',
  standalone: true,
  imports: [
    CardComponent,
    ListComponent,
    ListItemTemplateDirective,
    TranslateModule
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {

  rooms = signal<RoomsList>({total: 0, data: []});
  selectedRoom = signal<Room>({roomNumber: 0})
  skip = 0;
  allRooms = Array.from({ length: 1000 }, (value, index): Room => ({
    roomNumber: index,
  }));

  ngOnInit(): void {
    this.getFirstRooms();
  }

  getFirstRooms() {
    this.skip = 0;
    const firstRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.rooms.set({total: 1000, data: firstRooms});
  }

  fetchMoreRooms() {
    if (this.rooms().data.length === this.rooms().total) {
      return;
    }
    this.skip += 50;
    const nextRooms = this.allRooms.slice(this.skip, this.skip + 50);
    const totalRooms = {total: 1000, data: [...this.rooms().data, ...nextRooms]};
    this.rooms.set(totalRooms);
  }

  selectRoom(selectedRoom: Room) {
    if (selectedRoom) {
      this.selectedRoom.set(selectedRoom);
    }
  }
}
