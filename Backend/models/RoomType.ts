import { sql } from "../utils/database";

export interface RoomType {
  id?: number;
  name: string;
  description: string;
  pricePerPersonPerNight: number;
  beds: number;
}

export const createRoomTypeTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS roomTypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    pricePerPersonPerNight FLOAT NOT NULL,
    beds INTEGER NOT NULL
  );
`;

export const getRoomTypesQuery = () => sql`
  SELECT * FROM roomTypes;
`;

export const getRoomTypeByIdQuery = (id: number) => sql`
  SELECT * FROM roomTypes WHERE id=${id};
`;

export const createRoomTypeQuery = (roomType: RoomType) => sql`
  INSERT INTO roomTypes (name, description, pricePerPersonPerNight, beds)
  VALUES (${roomType.name}, ${roomType.description}, ${roomType.pricePerPersonPerNight}, ${roomType.beds})
  RETURNING *;
`;

export const updateRoomTypeQuery = (id: number, roomType: RoomType) => sql`
  UPDATE roomTypes
  SET
    name = ${roomType.name},
    description = ${roomType.description},
    pricePerPersonPerNight = ${roomType.pricePerPersonPerNight},
    beds = ${roomType.beds}
  WHERE id = ${id} RETURNING *;
`;

export const deleteRoomTypeQuery = (id: number) => sql`
  DELETE FROM roomTypes
  WHERE id = ${id} RETURNING *;
`;
