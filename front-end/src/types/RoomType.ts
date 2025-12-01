import type { IconType } from "react-icons";
import { AMENITIES } from "./Amenity";

export interface RoomAmenity {
  label: string;
  icon: IconType;
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
  amenities: RoomAmenity[];
  pricePerPersonPerNight: number;
  beds: number;
}

const A = (label: string) => ({
  label,
  icon: AMENITIES[label],
});

export const ROOM_TYPES: RoomType[] = [
  {
    id: 1,
    name: "Standard Room",
    description:
      "A comfortable and affordable room suitable for short stays or solo travelers.",
    pricePerPersonPerNight: 650,
    beds: 1,
    amenities: [
      A("Free Wi-Fi"),
      A("Flat-screen TV"),
      A("Air Conditioning"),
      A("Work Desk"),
      A("Wardrobe"),
      A("Complimentary Toiletries"),
      A("Daily Housekeeping"),
      A("Coffee/Tea Station"),
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description:
      "A spacious and stylish room offering upgraded comfort and convenience.",
    pricePerPersonPerNight: 950,
    beds: 1,
    amenities: [
      A("High-speed Wi-Fi"),
      A("Smart TV with Streaming"),
      A("Air Conditioning"),
      A("Mini-bar"),
      A("Premium Bedding"),
      A("Rainfall Shower"),
      A("In-room Safe"),
      A("Complimentary Bottled Water"),
      A("Coffee Maker"),
    ],
  },
  {
    id: 3,
    name: "Executive Room",
    description:
      "Ideal for business travelers with enhanced workspace and premium amenities.",
    pricePerPersonPerNight: 1300,
    beds: 1,
    amenities: [
      A("High-speed Wi-Fi"),
      A("Smart TV with Streaming"),
      A("Ergonomic Work Desk"),
      A("Air Conditioning"),
      A("Mini-bar"),
      A("In-room Safe"),
      A("Iron & Ironing Board"),
      A("Luxury Toiletries"),
      A("Complimentary Breakfast Access"),
    ],
  },
  {
    id: 4,
    name: "Junior Suite",
    description:
      "A luxurious suite featuring a relaxing lounge area and stylish finishes.",
    pricePerPersonPerNight: 1800,
    beds: 1,
    amenities: [
      A("Separate Seating Area"),
      A("King-size Bed"),
      A("High-speed Wi-Fi"),
      A("Smart TV with Streaming"),
      A("Nespresso Coffee Machine"),
      A("Luxury Toiletries"),
      A("Bathtub"),
      A("Mini-fridge"),
      A("Bathrobes & Slippers"),
    ],
  },
  {
    id: 5,
    name: "Suite",
    description:
      "A premium suite offering generous space, high-end comfort, and exclusive features.",
    pricePerPersonPerNight: 2600,
    beds: 2,
    amenities: [
      A("Living Room"),
      A("Kitchenette"),
      A("Walk-in Closet"),
      A("Fully-stocked Mini-bar"),
      A("Jacuzzi Bathtub"),
      A("Premium Sound System"),
      A("Dining/Meeting Table"),
      A("Premium Bedding"),
    ],
  },
  {
    id: 6,
    name: "Presidential Suite",
    description:
      "The pinnacle of luxury, offering unmatched space, services, and privacy.",
    pricePerPersonPerNight: 4800,
    beds: 3,
    amenities: [
      A("Private Terrace"),
      A("Full Kitchen"),
      A("Premium Sound System"),
      A("Spa Bathroom"),
      A("Jacuzzi Bathtub"),
      A("Dining/Meeting Table"),
      A("Separate Seating Area"),
      A("Personal Concierge"),
      A("Luxury Toiletries"),
    ],
  },
];
