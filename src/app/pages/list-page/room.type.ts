export type Room = {
  roomNumber: number,
  booked: boolean
}

export type RoomsList = {
  total: number,
  data: Room[]
}
