import { AMENITIES, type Amenity } from "./Amenity";

export interface RoomType {
  id: number;
  name: string;
  description: string;
  amenities: Amenity[]; // changed from string[] to Amenity[]
  pricePerPersonPerNight: number;
  beds: number;
}

export const ROOM_TYPES: RoomType[] = [
  {
    id: 1,
    name: "Standard Room",
    description:
      "A comfortable and affordable room suitable for short stays or solo travelers.",
    pricePerPersonPerNight: 650,
    beds: 1,
    amenities: [
      AMENITIES.FreeWiFi,
      AMENITIES.FlatScreenTV,
      AMENITIES.AirConditioning,
      AMENITIES.WorkDesk,
      AMENITIES.Wardrobe,
      AMENITIES.ComplimentaryToiletries,
      AMENITIES.DailyHousekeeping,
      AMENITIES.CoffeeTeaStation,
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
      AMENITIES.HighSpeedWiFi,
      AMENITIES.SmartTV,
      AMENITIES.AirConditioning,
      AMENITIES.MiniBar,
      AMENITIES.PremiumBedding,
      AMENITIES.RainfallShower,
      AMENITIES.InRoomSafe,
      AMENITIES.ComplimentaryBottledWater,
      AMENITIES.CoffeeMaker,
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
      AMENITIES.HighSpeedWiFi,
      AMENITIES.SmartTV,
      AMENITIES.ErgonomicWorkDesk,
      AMENITIES.AirConditioning,
      AMENITIES.MiniBar,
      AMENITIES.InRoomSafe,
      AMENITIES.IronAndIroningBoard,
      AMENITIES.LuxuryToiletries,
      AMENITIES.ComplimentaryBreakfast,
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
      AMENITIES.SeparateSeatingArea,
      AMENITIES.KingSizeBed,
      AMENITIES.HighSpeedWiFi,
      AMENITIES.SmartTV,
      AMENITIES.NespressoMachine,
      AMENITIES.LuxuryToiletries,
      AMENITIES.Bathtub,
      AMENITIES.MiniFridge,
      AMENITIES.BathrobesAndSlippers,
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
      AMENITIES.LivingRoom,
      AMENITIES.Kitchenette,
      AMENITIES.WalkInCloset,
      AMENITIES.FullyStockedMiniBar,
      AMENITIES.JacuzziBathtub,
      AMENITIES.PremiumSoundSystem,
      AMENITIES.DiningMeetingTable,
      AMENITIES.PremiumBedding,
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
      AMENITIES.PrivateTerrace,
      AMENITIES.FullKitchen,
      AMENITIES.HomeTheatreSystem,
      AMENITIES.SpaBathroom,
      AMENITIES.JacuzziBathtub,
      AMENITIES.DiningMeetingTable,
      AMENITIES.LivingRoom,
      AMENITIES.PersonalConcierge,
      AMENITIES.BathrobesAndSlippers,
    ],
  },
];
