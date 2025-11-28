import type { IconType } from "react-icons";
import { BiDrink } from "react-icons/bi";
import { FaParking, FaSwimmingPool } from "react-icons/fa";
import { GiBeachBucket } from "react-icons/gi";
import { TiWiFi } from "react-icons/ti";

export interface Amenity {
  name: string;
  icon: IconType;
}

export const AllAmenities: Amenity[] = [
  { name: "Swimming Pool", icon: FaSwimmingPool },
  { name: "Free Wifi", icon: TiWiFi },
  { name: "Parking", icon: FaParking },
  { name: "Beachfront", icon: GiBeachBucket },
  { name: "Bar", icon: BiDrink },
];
