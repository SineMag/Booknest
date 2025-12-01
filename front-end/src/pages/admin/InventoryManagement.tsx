import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import styles from "./InventoryManagement.module.css";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addHotel,
  fetchHotels,
  updateHotel,
} from "../../features/InventoryManagementSlice";
import type { Hotel } from "../../features/InventoryManagementSlice";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { ROOM_TYPES } from "../../types/RoomType";
import {
  createAccomodation,
  deleteAccomodation,
  fetchAccomodations,
  updateAccomodation,
} from "../../features/accomodationSlice";
import type { Accomodation, IAccomodation } from "../../types/Accomodation";
import { AMENITIES } from "../../types/Amenity";

interface HotelForm {
  name: string;
  description: string;
  imagegallery: string;
  amenities: string[]; // array of amenity labels
  physicaladdress: string;
  phonenumber: string;
  emailaddress: string;
  roomtypes: string[]; // array of room type names
  rating: string;
}

export default function InventoryManagement(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<HotelForm>({
    name: "",
    description: "",
    imagegallery: "",
    amenities: [],
    physicaladdress: "",
    phonenumber: "",
    emailaddress: "",
    roomtypes: [],
    rating: "",
  });
  const [editingHotelId, setEditingHotelId] = useState<number | null>(null);

  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [roomTypesOpen, setRoomTypesOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { hotels, loading, error } = useSelector(
    (state: RootState) => state.hotels
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  useEffect(() => {
    if (loading) dispatch(fetchAccomodations());
  }, [loading, dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const editId = urlParams.get("edit");
    if (editId && accomodations.length > 0) {
      const hotelToEdit = accomodations.find((h) => h.id === Number(editId));
      if (hotelToEdit) openModalForEdit(hotelToEdit);
    }
  }, [hotels, location.search]);

  const openModalForEdit = (hotel: Hotel) => {
    setForm({
      name: hotel.name,
      description: hotel.description,
      imagegallery: hotel.imagegallery.join(", "),
      amenities: hotel.amenities, // already labels
      roomtypes: hotel.roomtypes, // already names
      physicaladdress: hotel.physicaladdress,
      phonenumber: hotel.phonenumber,
      emailaddress: hotel.emailaddress,
      rating: hotel.rating.toString(),
    });
    setEditingHotelId(hotel.id!);
    setShowModal(true);
  };

  const viewHotel = (id: number) => navigate(`/accommodation-details/${id}`);

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      imagegallery: "",
      amenities: [],
      physicaladdress: "",
      phonenumber: "",
      emailaddress: "",
      roomtypes: [],
      rating: "",
    });
    setEditingHotelId(null);
    setShowModal(false);
  };

  const onSubmitHotel = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      imageGallery: form.imagegallery.split(",").map((s) => s.trim()),
      amenities: form.amenities,
      roomTypes: form.roomtypes,
      physicalAddress: form.physicaladdress,
      phoneNumber: form.phonenumber,
      emailAddress: form.emailaddress,
      rating: Number(form.rating) || 0,
    };

    try {
      if (editingHotelId) {
        await dispatch(
          updateAccomodation({ id: editingHotelId, accomodation: payload })
        );
      } else {
        await dispatch(createAccomodation(payload));
      }
      resetForm();
    } catch (err) {
      console.error("Failed to submit hotel:", err);
      alert("Failed to submit hotel.");
    }
  };

  const overlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.modalOverlay))
      resetForm();
  };

  return (
    <>

      <div className={styles.inventory}>
        <div className={styles.header}>
          <h2>Inventory Management</h2>
          <Button type="button" onClick={() => setShowModal(true)}>
            Add New Hotel
          </Button>
        </div>

        {loading && <p>Loading hotels…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className={styles.grid}>
          {hotels.map((h) => (
            <div key={h.id} className={styles.card}>
              <div className={styles.imagegallery}>
                <img
                  src={h.imagegallery[0] || "/placeholder-hotel.jpg"}
                  alt={h.name}
                  className={styles.hotelImage}
                />
              </div>

              <h3>{h.name}</h3>
              <p>{h.physicaladdress}</p>
              <p>{h.emailaddress}</p>
              <p>Rating: {h.rating}</p>

              <div className={styles.cardButtons}>
                <Button
                  type="button"
                  width={60}
                  onClick={() => viewHotel(h.id)}
                  variant="success"
                >
                  <FaEye />
                </Button>

                <Button
                  type="button"
                  width={60}
                  onClick={() => openModalForEdit(h)}
                >
                  <FaEdit />
                </Button>

                <Button
                  type="button"
                  width={60}
                  onClick={() => deleteHotel(h.id)}
                  variant="danger"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>

            <div className={styles.grid}>
              {accomodations.map((h) => (
                <div key={h.id} className={styles.card}>
                  <div className={styles.imagegallery}>
                    <img
                      src={h.imagegallery?.[0] || "/placeholder-hotel.jpg"}
                      alt={h.name}
                      className={styles.hotelImage}
                    />
                  </div>
                  <h3>{h.name}</h3>
                  <p>{h.physicaladdress}</p>
                  <p>{h.emailaddress}</p>
                  <p>Rating: {h.rating}</p>

                  <div className={styles.cardButtons}>
                    <Button
                      type="button"
                      width={60}
                      onClick={() => viewHotel(h.id!)}
                      variant="success"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      type="button"
                      width={60}
                      onClick={() => openModalForEdit(h)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      type="button"
                      width={60}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete?"))
                          dispatch(deleteAccomodation(h.id!));
                      }}
                      variant="danger"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {showModal && (
              <div className={styles.modalOverlay} onClick={overlayClick}>
                <div className={styles.modal} role="dialog" aria-modal="true">
                  <h2>{editingHotelId ? "Edit Hotel" : "Add New Hotel"}</h2>
                  <form onSubmit={onSubmitHotel} className={styles.modalForm}>
                    <InputField
                      type="text"
                      field={form.name}
                      setField={(v) => setForm({ ...form, name: String(v) })}
                      placeholder="Hotel Name"
                    />
                    <InputField
                      type="textarea"
                      field={form.description}
                      setField={(v) =>
                        setForm({ ...form, description: String(v) })
                      }
                      placeholder="Description"
                    />

                    {/* Image Gallery */}
                    <div className={styles.formGroup}>
                      <label>Image Gallery</label>
                      {form.imagegallery.split(",").map((img, idx) => (
                        <div key={idx} className={styles.imageInputRow}>
                          <input
                            type="text"
                            value={img}
                            onChange={(e) => {
                              const images = form.imagegallery.split(",");
                              images[idx] = e.target.value;
                              setForm({
                                ...form,
                                imagegallery: images.join(","),
                              });
                            }}
                            placeholder={`Image URL ${idx + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const images = form.imagegallery.split(",");
                              images.splice(idx, 1);
                              setForm({
                                ...form,
                                imagegallery: images.join(","),
                              });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const images = form.imagegallery.split(",");
                          images.splice(idx, 1);
                          setForm({ ...form, imagegallery: images.join(",") });
                        }}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Amenities Dropdown */}
                    <div className={styles.dropdownWrapper}>
                      <label>Amenities</label>
                      <div
                        className={styles.dropdownHeader}
                        onClick={() => setAmenitiesOpen(!amenitiesOpen)}
                      >
                        {form.amenities.length
                          ? form.amenities.join(", ")
                          : "Select amenities"}
                        <span className={styles.arrow}>
                          {amenitiesOpen ? "▲" : "▼"}
                        </span>
                      </div>
                      {amenitiesOpen && (
                        <div className={styles.dropdownList}>
                          {Object.keys(AMENITIES).map((label) => (
                            <label key={label} className={styles.dropdownItem}>
                              <input
                                type="checkbox"
                                checked={form.amenities.includes(label)}
                                onChange={(e) => {
                                  const selected = [...form.amenities];
                                  if (e.target.checked) selected.push(label);
                                  else
                                    selected.splice(selected.indexOf(label), 1);
                                  setForm({ ...form, amenities: selected });
                                }}
                              />
                              {label}
                            </label>
                          ))}
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
                          ? form.roomtypes.join(", ")
                          : "Select room types"}
                        <span className={styles.arrow}>
                          {roomTypesOpen ? "▲" : "▼"}
                        </span>
                      </div>
                      {roomTypesOpen && (
                        <div className={styles.dropdownList}>
                          {ROOM_TYPES.map((room) => (
                            <label
                              key={room.name}
                              className={styles.dropdownItem}
                            >
                              <input
                                type="checkbox"
                                checked={form.roomtypes.includes(room.name)}
                                onChange={(e) => {
                                  const selected = [...form.roomtypes];
                                  if (e.target.checked)
                                    selected.push(room.name);
                                  else
                                    selected.splice(
                                      selected.indexOf(room.name),
                                      1
                                    );
                                  setForm({ ...form, roomtypes: selected });
                                }}
                              />
                              {room.name}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <InputField
                      type="number"
                      field={form.rating}
                      setField={(v) => setForm({ ...form, rating: String(v) })}
                      placeholder="Rating (0-5)"
                    />
                    <InputField
                      type="text"
                      field={form.physicaladdress}
                      setField={(v) =>
                        setForm({ ...form, physicaladdress: String(v) })
                      }
                      placeholder="Address"
                    />
                    <div className={styles.inputGroup}>
                      <InputField
                        type="text"
                        field={form.phonenumber}
                        setField={(v) =>
                          setForm({ ...form, phonenumber: String(v) })
                        }
                        placeholder="Phone Number"
                      />
                      <InputField
                        type="text"
                        field={form.emailaddress}
                        setField={(v) =>
                          setForm({ ...form, emailaddress: String(v) })
                        }
                        placeholder="Email Address"
                      />
                    </div>

                    <div className={styles.modalButtons}>
                      <Button type="submit" width={130}>
                        {editingHotelId ? "UPDATE" : "ADD HOTEL"}
                      </Button>
                      <Button type="button" width={130} onClick={resetForm}>
                        CANCEL
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Amenities Dropdown */}
                <div className={styles.dropdownWrapper}>
                  <label>Amenities</label>
                  <div
                    className={styles.dropdownHeader}
                    onClick={() => setAmenitiesOpen(!amenitiesOpen)}
                  >
                    {form.amenities.length
                      ? form.amenities
                          .map((key) => AMENITIES[key].name)
                          .join(", ")
                      : "Select amenities"}
                    <span className={styles.arrow}>
                      {amenitiesOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {amenitiesOpen && (
                    <div className={styles.dropdownList}>
                      {Object.keys(AMENITIES).map((key) => (
                        <label key={key} className={styles.dropdownItem}>
                          <input
                            type="checkbox"
                            checked={form.amenities.includes(
                              key as keyof typeof AMENITIES
                            )}
                            onChange={(e) => {
                              const selected = [...form.amenities];
                              if (e.target.checked)
                                selected.push(key as keyof typeof AMENITIES);
                              else
                                selected.splice(
                                  selected.indexOf(
                                    key as keyof typeof AMENITIES
                                  ),
                                  1
                                );
                              setForm({ ...form, amenities: selected });
                            }}
                          />
                          {AMENITIES[key as keyof typeof AMENITIES].name}
                        </label>
                      ))}
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
                      ? form.roomtypes
                          .map((key) => ROOM_TYPES[key].name)
                          .join(", ")
                      : "Select room types"}
                    <span className={styles.arrow}>
                      {roomTypesOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {roomTypesOpen && (
                    <div className={styles.dropdownList}>
                      {Object.keys(ROOM_TYPES).map((key) => (
                        <label key={key} className={styles.dropdownItem}>
                          <input
                            type="checkbox"
                            checked={form.roomtypes.includes(
                              key as keyof typeof ROOM_TYPES
                            )}
                            onChange={(e) => {
                              const selected = [...form.roomtypes];
                              if (e.target.checked)
                                selected.push(key as keyof typeof ROOM_TYPES);
                              else
                                selected.splice(
                                  selected.indexOf(
                                    key as keyof typeof ROOM_TYPES
                                  ),
                                  1
                                );
                              setForm({ ...form, roomtypes: selected });
                            }}
                          />
                          {ROOM_TYPES[key as keyof typeof ROOM_TYPES].name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <InputField
                  type="number"
                  field={form.rating}
                  setField={(v) => setForm({ ...form, rating: String(v) })}
                  placeholder="Rating (0-5)"
                />
                <InputField
                  type="text"
                  field={form.physicaladdress}
                  setField={(v) =>
                    setForm({ ...form, physicaladdress: String(v) })
                  }
                  placeholder="Address"
                />
                <div className={styles.inputGroup}>
                  <p>1</p>
                  <p>2</p>
                </div>

                <div className={styles.modalButtons}>
                  <Button
                    type="submit"
                    width={130}
                    onClick={() => {
                      console.log("Clicked...");
                    }}
                  >
                    {editingHotelId ? "UPDATE" : "ADD HOTEL"}
                  </Button>
                  <Button
                    type="button"
                    width={130}
                    onClick={() => {
                      setShowModal(false);
                      setEditingHotelId(null);
                    }}
                  >
                    CANCEL
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

    </>
  );
}
