import { sql } from "../utils/database";

export interface Accomodation {
  id?: number;
  name: string;
  description: string;
  imageGallery: string[];
  amenities: string[];
  physicalAddress: string;
  phoneNumber: string;
  emailAddress: string;
  roomTypes: string[];
  pricePerNight: number;
  rating: number;
}

export const accomodationTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS accomodations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    imageGallery TEXT[] NOT NULL,
    amenities TEXT[] NOT NULL,
    physicalAddress VARCHAR(255) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    pricePerNight FLOAT NOT NULL,
    roomTypes TEXT[] NOT NULL,
    rating FLOAT NOT NULL
  );
`;

export const getAccomodationsQuery = () => sql`
  SELECT * FROM accomodations;`;

export const getAccomodationByIdQuery = (id: number) => sql`
  SELECT * FROM accomodations WHERE id=${id};`;

export const createAccomodationQuery = (accomodation: Accomodation) => sql`
  INSERT INTO accomodations (
    name,
    description,
    imageGallery,
    amenities,
    physicalAddress,
    phoneNumber,
    emailAddress,
    roomTypes,
    rating,
    pricePerNight
  )
  VALUES (
    ${accomodation.name},
    ${accomodation.description},
    ${accomodation.imageGallery},
    ${accomodation.amenities},
    ${accomodation.physicalAddress},
    ${accomodation.phoneNumber},
    ${accomodation.emailAddress},
    ${accomodation.roomTypes},
    ${accomodation.rating},
    ${accomodation.pricePerNight}
) RETURNING *;`;

export const updateAccomodationQuery = (
  id: number,
  accomodation: Accomodation
) => sql`
  UPDATE accomodations
  SET
    name = ${accomodation.name},
    description = ${accomodation.description},
    imageGallery = ${accomodation.imageGallery},
    amenities = ${accomodation.amenities},
    physicalAddress = ${accomodation.physicalAddress},
    phoneNumber = ${accomodation.phoneNumber},
    emailAddress = ${accomodation.emailAddress},
    roomTypes = ${accomodation.roomTypes},
    rating = ${accomodation.rating},
    pricePerNight = ${accomodation.pricePerNight}
  WHERE id = ${id} RETURNING *;`;

export const deleteAccomodationQuery = (id: number) => sql`
  DELETE FROM accomodations
  WHERE id = ${id} RETURNING *;`;
