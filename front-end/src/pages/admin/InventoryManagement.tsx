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
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof HotelForm, string>>
  >({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof HotelForm, string>> = {};

    if (!form.name.trim()) errors.name = "Hotel name is required";
    if (!form.description.trim())
      errors.description = "Description is required";
    if (!form.physicaladdress.trim())
      errors.physicaladdress = "Address is required";
    if (!form.phonenumber.trim())
      errors.phonenumber = "Phone number is required";
    if (!form.emailaddress.trim()) {
      errors.emailaddress = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.emailaddress)) {
      errors.emailaddress = "Email is invalid";
    }
    if (!form.rating || Number(form.rating) < 1 || Number(form.rating) > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }
    if (!form.pricepernight || Number(form.pricepernight) <= 0) {
      errors.pricepernight = "Price must be greater than 0";
    }
    if (form.amenities.length === 0)
      errors.amenities = "Select at least one amenity";
    if (form.roomtypes.length === 0)
      errors.roomtypes = "Select at least one room type";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: form.name,
      description: form.description,
      imageGallery: form.imagegallery
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
      amenities: form.amenities.map((key) => AMENITIES[key].name),
      roomTypes: ROOM_TYPES.filter((rt) => form.roomtypes.includes(rt.id)).map(
        (rt) => rt.name,
      ),
      physicalAddress: form.physicaladdress,
      phoneNumber: form.phonenumber,
      emailAddress: form.emailaddress,
      rating: Number(form.rating) || 0,
      pricePerNight: Number(form.pricepernight) || 0,
    };

    console.log("Sending payload:", payload); // Debug log

    try {
      if (editingHotelId) {
        await dispatch(
          updateHotel({ id: editingHotelId, hotel: payload }),
        ).unwrap();
        setSuccessMessage("Hotel updated successfully!");
      } else {
        await dispatch(addHotel(payload)).unwrap();
        setSuccessMessage("Hotel added successfully!");
      }

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      closeModal();
    } catch (error: any) {
      console.error("Operation failed:", error);

      // Show specific error message to user
      let errorMessage = "Failed to save hotel. Please try again.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = `Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage =
          "Network error: Unable to connect to the server. Please check your internet connection.";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = `Error: ${error.message}`;
      }

      // You could set an error state here to show to the user
      alert(errorMessage); // Temporary - you might want to use a better UI for this
    }
  };

  const handleDeleteHotel = async (hotelId: number, hotelName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${hotelName}"? This action cannot be undone.`,
      )
    ) {
      try {
        await dispatch(deleteHotel(hotelId)).unwrap();
        setSuccessMessage("Hotel deleted successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error: any) {
        console.error("Delete failed:", error);
        let errorMessage = "Failed to delete hotel. Please try again.";

        if (error.response) {
          errorMessage = `Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
        } else if (error.request) {
          errorMessage = "Network error: Unable to connect to the server.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }

        alert(errorMessage);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingHotelId(null);
    setForm(INITIAL_FORM);
    setFormErrors({});
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

      {showSuccessMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      <div className={styles.grid}>
        {hotels.map((h) => {
          console.log(`Hotel ${h.name} images:`, h.imagegallery);
          return (
            <div key={h.id} className={styles.card}>
              <img
                src={h.imagegallery?.[0] || "/placeholder.jpg"}
                alt={h.name}
                className={styles.hotelImage}
                onError={(e) => {
                  console.log(
                    `Image failed to load for ${h.name}:`,
                    h.imagegallery?.[0],
                  );
                  e.currentTarget.src = "/placeholder.jpg";
                }}
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
                  onClick={() => handleDeleteHotel(h.id, h.name)}
                  variant="danger"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          );
        })}
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
              {formErrors.name && (
                <span className={styles.errorText}>{formErrors.name}</span>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Enter hotel description"
                  rows={3}
                  required
                />
                {formErrors.description && (
                  <span className={styles.errorText}>
                    {formErrors.description}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="imagegallery">Image Gallery URLs</label>
                <textarea
                  id="imagegallery"
                  value={form.imagegallery}
                  onChange={(e) =>
                    setForm({ ...form, imagegallery: e.target.value })
                  }
                  placeholder="Enter image URLs separated by commas&#10;Example: https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows={3}
                />
                <small className={styles.helpText}>
                  💡 Enter valid image URLs separated by commas. Make sure URLs
                  are accessible and point to image files (jpg, png, etc.)
                </small>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="physicaladdress">Physical Address</label>
                <input
                  id="physicaladdress"
                  type="text"
                  value={form.physicaladdress}
                  onChange={(e) =>
                    setForm({ ...form, physicaladdress: e.target.value })
                  }
                  placeholder="Enter physical address"
                  required
                />
                {formErrors.physicaladdress && (
                  <span className={styles.errorText}>
                    {formErrors.physicaladdress}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  id="phonenumber"
                  type="tel"
                  value={form.phonenumber}
                  onChange={(e) =>
                    setForm({ ...form, phonenumber: e.target.value })
                  }
                  placeholder="Enter phone number"
                  required
                />
                {formErrors.phonenumber && (
                  <span className={styles.errorText}>
                    {formErrors.phonenumber}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="emailaddress">Email Address</label>
                <input
                  id="emailaddress"
                  type="email"
                  value={form.emailaddress}
                  onChange={(e) =>
                    setForm({ ...form, emailaddress: e.target.value })
                  }
                  placeholder="Enter email address"
                  required
                />
                {formErrors.emailaddress && (
                  <span className={styles.errorText}>
                    {formErrors.emailaddress}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rating">Rating (1-5)</label>
                <input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = parseFloat(value);

                    // Only update if value is empty, a valid number within range, or user is typing
                    if (
                      value === "" ||
                      (!isNaN(numValue) && numValue >= 1 && numValue <= 5)
                    ) {
                      setForm({ ...form, rating: value });
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    const numValue = parseFloat(value);

                    // Enforce range on blur
                    if (value === "") {
                      setForm({ ...form, rating: "" });
                    } else if (numValue < 1) {
                      setForm({ ...form, rating: "1" });
                    } else if (numValue > 5) {
                      setForm({ ...form, rating: "5" });
                    } else {
                      setForm({ ...form, rating: value });
                    }
                  }}
                  placeholder="Enter rating"
                  required
                />
                {formErrors.rating && (
                  <span className={styles.errorText}>{formErrors.rating}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="pricepernight">Price Per Night (R)</label>
                <input
                  id="pricepernight"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.pricepernight}
                  onChange={(e) =>
                    setForm({ ...form, pricepernight: e.target.value })
                  }
                  placeholder="Enter price per night"
                  required
                />
                {formErrors.pricepernight && (
                  <span className={styles.errorText}>
                    {formErrors.pricepernight}
                  </span>
                )}
              </div>

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
                {formErrors.amenities && (
                  <span className={styles.errorText}>
                    {formErrors.amenities}
                  </span>
                )}
                {amenitiesOpen && (
                  <div className={styles.dropdownList}>
                    <div className={styles.dropdownContent}>
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
                    <div className={styles.dropdownActions}>
                      <button
                        type="button"
                        className={styles.saveButton}
                        onClick={() => setAmenitiesOpen(false)}
                      >
                        ✓ Save Selection
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Room Types Dropdown */}
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
                {formErrors.roomtypes && (
                  <span className={styles.errorText}>
                    {formErrors.roomtypes}
                  </span>
                )}
                {roomTypesOpen && (
                  <div className={styles.dropdownList}>
                    <div className={styles.dropdownContent}>
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
                    <div className={styles.dropdownActions}>
                      <button
                        type="button"
                        className={styles.saveButton}
                        onClick={() => setRoomTypesOpen(false)}
                      >
                        ✓ Save Selection
                      </button>
                    </div>
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
