import {
  FaWifi,
  FaTv,
  FaFan,
  FaGlassWhiskey,
  FaHotTub,
  FaBed,
  FaCouch,
  FaCrown,
  FaShower,
  FaDoorOpen,
  FaBath,
  FaLaptop,
  FaWineGlassAlt,
  FaBoxOpen,
  FaLock,
  FaTshirt,
  FaConciergeBell,
} from "react-icons/fa";

import {
  MdOutlineFreeBreakfast,
  MdKitchen,
  MdOutlineMeetingRoom,
  MdOutlineRoomService,
  MdOutlineLocalDrink,
} from "react-icons/md";

import {
  GiSlippers,
  GiHanger,
  GiVacuumCleaner,
  GiCoffeeCup,
} from "react-icons/gi";

import { IoBedOutline } from "react-icons/io5";
import type { IconType } from "react-icons";

export type Amenity = {
  name: string;
  icon: IconType;
};

export const AMENITIES: Record<string, Amenity> = {
  FreeWiFi: {
    name: "Free Wi-Fi",
    icon: FaWifi,
  },
  HighSpeedWiFi: {
    name: "High-speed Wi-Fi",
    icon: FaWifi,
  },
  FlatScreenTV: {
    name: "Flat-screen TV",
    icon: FaTv,
  },
  SmartTV: {
    name: "Smart TV with Streaming",
    icon: FaTv,
  },
  AirConditioning: {
    name: "Air Conditioning",
    icon: FaFan,
  },
  MiniBar: {
    name: "Mini-bar",
    icon: FaGlassWhiskey,
  },
  FullyStockedMiniBar: {
    name: "Fully-stocked Mini-bar",
    icon: FaWineGlassAlt,
  },
  RainfallShower: {
    name: "Rainfall Shower",
    icon: FaShower,
  },
  WorkDesk: {
    name: "Work Desk",
    icon: FaLaptop,
  },
  ErgonomicWorkDesk: {
    name: "Ergonomic Work Desk",
    icon: FaLaptop,
  },
  Wardrobe: {
    name: "Wardrobe",
    icon: GiHanger,
  },
  ComplimentaryToiletries: {
    name: "Complimentary Toiletries",
    icon: FaBath,
  },
  LuxuryToiletries: {
    name: "Luxury Toiletries",
    icon: FaBath,
  },
  DailyHousekeeping: {
    name: "Daily Housekeeping",
    icon: GiVacuumCleaner,
  },
  CoffeeTeaStation: {
    name: "Coffee/Tea Station",
    icon: GiCoffeeCup,
  },
  CoffeeMaker: {
    name: "Coffee Maker",
    icon: GiCoffeeCup,
  },
  NespressoMachine: {
    name: "Nespresso Coffee Machine",
    icon: GiCoffeeCup,
  },
  MiniFridge: {
    name: "Mini-fridge",
    icon: FaBoxOpen,
  },
  PremiumBedding: {
    name: "Premium Bedding",
    icon: FaBed,
  },
  KingSizeBed: {
    name: "King-size Bed",
    icon: IoBedOutline,
  },
  JacuzziBathtub: {
    name: "Jacuzzi Bathtub",
    icon: FaHotTub,
  },
  Bathtub: {
    name: "Bathtub",
    icon: FaBath,
  },
  SeparateSeatingArea: {
    name: "Separate Seating Area",
    icon: FaCouch,
  },
  LivingRoom: {
    name: "Living Room",
    icon: FaCouch,
  },
  DiningMeetingTable: {
    name: "Dining/Meeting Table",
    icon: MdOutlineMeetingRoom,
  },
  ComplimentaryBottledWater: {
    name: "Complimentary Bottled Water",
    icon: MdOutlineLocalDrink,
  },
  InRoomSafe: {
    name: "In-room Safe",
    icon: FaLock,
  },
  IronAndIroningBoard: {
    name: "Iron & Ironing Board",
    icon: FaTshirt,
  },
  WalkInCloset: {
    name: "Walk-in Closet",
    icon: FaDoorOpen,
  },
  Kitchenette: {
    name: "Kitchenette",
    icon: MdKitchen,
  },
  FullKitchen: {
    name: "Full Kitchen",
    icon: MdKitchen,
  },
  PremiumSoundSystem: {
    name: "Premium Sound System",
    icon: FaCrown,
  },
  HomeTheatreSystem: {
    name: "Home Theatre System",
    icon: FaCrown,
  },
  PrivateTerrace: {
    name: "Private Terrace",
    icon: FaDoorOpen,
  },
  SpaBathroom: {
    name: "Spa Bathroom",
    icon: FaBath,
  },
  BathrobesAndSlippers: {
    name: "Bathrobes & Slippers",
    icon: GiSlippers,
  },
  ComplimentaryBreakfast: {
    name: "Complimentary Breakfast Access",
    icon: MdOutlineFreeBreakfast,
  },
  RoomService: {
    name: "Room Service",
    icon: MdOutlineRoomService,
  },
  PersonalConcierge: {
    name: "Personal Concierge",
    icon: FaConciergeBell,
  },
} as const;
