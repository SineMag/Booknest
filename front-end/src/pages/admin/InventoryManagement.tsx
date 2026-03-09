import { useEffect, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import styles from "./InventoryManagement.module.css";

import type { AppDispatch, RootState } from "../../../store";
import {
  addHotel,
  deleteHotel,
  fetchHotels,
  updateHotel,
  type Hotel,
} from "../../features/InventoryManagementSlice";

import { AMENITIES } from "../../types/Amenity";
import { ROOM_TYPES } from "../../types/RoomType";

interface HotelForm {
  name: string;
  description: string;
  imagegallery: string;
  amenities: (keyof typeof AMENITIES)[];
  physicaladdress: string;
  phonenumber: string;
  emailaddress: string;
  roomtypes: number[]; // Use IDs for the array-based room types
  rating: string;
  pricepernight: string;
}

const INITIAL_FORM: HotelForm = {
  name: "",
  description: "",
  imagegallery: "",
  amenities: [],
  physicaladdress: "",
  phonenumber: "",
  emailaddress: "",
  roomtypes: [],
  rating: "",
  pricepernight: "",
};

export default function InventoryManagement(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<HotelForm>(INITIAL_FORM);
  const [editingHotelId, setEditingHotelId] = useState<number | null>(null);

  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [roomTypesOpen, setRoomTypesOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { hotels, loading, error } = useSelector(
    (state: RootState) => state.hotels,
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const editId = urlParams.get("edit");
    if (editId && hotels.length > 0) {
      const hotelToEdit = hotels.find((h) => h.id === Number(editId));
      if (hotelToEdit) openModalForEdit(hotelToEdit);
    }
  }, [hotels, location.search]);

  const openModalForEdit = (hotel: Hotel) => {
    setForm({
      name: hotel.name,
      description: hotel.description,
      imagegallery: hotel.imagegallery.join(", "),
      // Find keys for amenities
      amenities: hotel.amenities
        .map((name) =>
          Object.keys(AMENITIES).find(
            (key) => AMENITIES[key as keyof typeof AMENITIES].name === name,
          ),
        )
        .filter(Boolean) as (keyof typeof AMENITIES)[],
      // Find IDs for room types
      roomtypes: hotel.roomtypes
        .map((name) => ROOM_TYPES.find((rt) => rt.name === name)?.id)
        .filter((id): id is number => id !== undefined),
      physicaladdress: hotel.physicaladdress,
      phonenumber: hotel.phonenumber,
      emailaddress: hotel.emailaddress,
      rating: hotel.rating.toString(),
      pricepernight: String(hotel.pricepernight),
    });

    setEditingHotelId(hotel.id);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      imagegallery: form.imagegallery
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      amenities: form.amenities.map((key) => AMENITIES[key].name),
      roomtypes: ROOM_TYPES.filter((rt) => form.roomtypes.includes(rt.id)).map(
        (rt) => rt.name,
      ),
      physicaladdress: form.physicaladdress,
      phonenumber: form.phonenumber,
      emailaddress: form.emailaddress,
      rating: Number(form.rating) || 0,
      pricepernight: Number(form.pricepernight) || 0,
    };

    if (editingHotelId) {
      dispatch(updateHotel({ id: editingHotelId, hotel: payload }));
    } else {
      dispatch(addHotel(payload));
    }

    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingHotelId(null);
    setForm(INITIAL_FORM);
  };

  return (
    <div className={styles.inventory}>
      <div className={styles.header}>
        <h2>Inventory Management</h2>
        <Button type="button" onClick={() => setShowModal(true)}>
          Add New Hotel
        </Button>
      </div>

      {loading && <p>Loading hotels...</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      <div className={styles.grid}>
        {hotels.map((h) => (
          <div key={h.id} className={styles.card}>
            <img
              src={h.imagegallery[0] || "/placeholder-hotel.jpg"}
              alt={h.name}
              className={styles.hotelImage}
            />
            <h3>{h.name}</h3>
            <div className={styles.cardButtons}>
              <Button
                onClick={() => navigate(`/accommodation-details/${h.id}`)}
                variant="success"
              >
                <FaEye />
              </Button>
              <Button onClick={() => openModalForEdit(h)}>
                <FaEdit />
              </Button>
              <Button
                onClick={() => dispatch(deleteHotel(h.id))}
                variant="danger"
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className={styles.modal}>
            <h2>{editingHotelId ? "Edit Hotel" : "Add New Hotel"}</h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <InputField
                field={form.name}
                setField={(v) => setForm({ ...form, name: String(v) })}
                placeholder="Hotel Name"
                type="text"
              />

              {/* Amenities Dropdown */}
              <div className={styles.dropdownWrapper}>
                <label>Amenities</label>
                <div
                  className={styles.dropdownHeader}
                  onClick={() => setAmenitiesOpen(!amenitiesOpen)}
                >
                  {form.amenities.length
                    ? form.amenities.map((k) => AMENITIES[k].name).join(", ")
                    : "Select Amenities"}
                </div>
                {amenitiesOpen && (
                  <div className={styles.dropdownList}>
                    {Object.keys(AMENITIES).map((key) => (
                      <label key={key} className={styles.dropdownItem}>
                        <input
                          type="checkbox"
                          checked={form.amenities.includes(
                            key as keyof typeof AMENITIES,
                          )}
                          onChange={(e) => {
                            const keyTyped = key as keyof typeof AMENITIES;
                            const next = e.target.checked
                              ? [...form.amenities, keyTyped]
                              : form.amenities.filter((k) => k !== keyTyped);
                            setForm({ ...form, amenities: next });
                          }}
                        />
                        {AMENITIES[key as keyof typeof AMENITIES].name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Room Types Dropdown - Fixed for Array */}
              <div className={styles.dropdownWrapper}>
                <label>Room Types</label>
                <div
                  className={styles.dropdownHeader}
                  onClick={() => setRoomTypesOpen(!roomTypesOpen)}
                >
                  {form.roomtypes.length
                    ? ROOM_TYPES.filter((rt) => form.roomtypes.includes(rt.id))
                        .map((rt) => rt.name)
                        .join(", ")
                    : "Select Room Types"}
                </div>
                {roomTypesOpen && (
                  <div className={styles.dropdownList}>
                    {ROOM_TYPES.map((rt) => (
                      <label key={rt.id} className={styles.dropdownItem}>
                        <input
                          type="checkbox"
                          checked={form.roomtypes.includes(rt.id)}
                          onChange={(e) => {
                            const next = e.target.checked
                              ? [...form.roomtypes, rt.id]
                              : form.roomtypes.filter((id) => id !== rt.id);
                            setForm({ ...form, roomtypes: next });
                          }}
                        />
                        {rt.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.modalButtons}>
                <Button type="submit">
                  {editingHotelId ? "UPDATE" : "ADD HOTEL"}
                </Button>
                <Button type="button" onClick={closeModal}>
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
