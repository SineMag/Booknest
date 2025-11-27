import {
  createRoomTypeQuery,
  deleteRoomTypeQuery,
  getRoomTypeByIdQuery,
  getRoomTypesQuery,
  updateRoomTypeQuery,
  type RoomType,
} from "../models/RoomType";

export const selectAllRoomTypesDB = async () => {
  const roomTypes = await getRoomTypesQuery();
  return roomTypes;
};

export const selectRoomTypeByIdDB = async (id: number) => {
  const roomType = await getRoomTypeByIdQuery(id);
  return roomType;
};

export const createRoomTypeDB = async (roomType: RoomType) => {
  const result = await createRoomTypeQuery(roomType);
  return result;
};

export const updateRoomTypeDB = async (id: number, roomType: RoomType) => {
  const result = await updateRoomTypeQuery(id, roomType);
  return result;
};

export const deleteRoomTypeDB = async (id: number) => {
  const result = await deleteRoomTypeQuery(id);
  return result;
};
