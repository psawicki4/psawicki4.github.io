export interface Room {
  roomNumber: number,
  booked: boolean
}

export interface RoomsList {
  total: number,
  data: Room[]
}
