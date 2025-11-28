import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import styles from "./InventoryManagement.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { addHotel, fetchHotels} from "../../features/InventoryManagementSlice";
import type { Hotel } from "../../features/InventoryManagementSlice";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface HotelForm {
  name: string;
  description: string;
  imagegallery: string;
  amenities: string;
  physicaladdress: string;
  phonenumber: string;
  emailaddress: string;
  roomtypes: string;
  rating: string;
}

export default function InventoryManagement(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<HotelForm>({
    name: "",
    description: "",
    imagegallery: "",
    amenities: "",
    physicaladdress: "",
    phonenumber: "",
    emailaddress: "",
    roomtypes: "",
    rating: "",
  });
  const [editingHotelId, setEditingHotelId] = useState<number | null>(null);

  // Dropdown states
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [roomTypesOpen, setRoomTypesOpen] = useState(false);

  const API_URL = "https://booknestapi.netlify.app/accomodations";

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
      amenities: hotel.amenities.join(", "),
      physicaladdress: hotel.physicaladdress,
      phonenumber: hotel.phonenumber,
      emailaddress: hotel.emailaddress,
      roomtypes: hotel.roomtypes.join(", "),
      rating: hotel.rating.toString(),
    });
    setEditingHotelId(hotel.id);
    setShowModal(true);
  };

  const viewHotel = (id: number) => {
    navigate(`/accommodation-details/${id}`);
  };

  const deleteHotel = async (hotelId: number) => {
    try {
      await axios.delete(`${API_URL}/${hotelId}`);
      dispatch(fetchHotels());
    } catch (err) {
      console.error("Failed to delete hotel:", err);
      alert("Failed to delete hotel.");
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      imageGallery: form.imagegallery.split(",").map((s) => s.trim()),
      amenities: form.amenities.split(",").map((s) => s.trim()),
      roomTypes: form.roomtypes.split(",").map((s) => s.trim()),
      physicalAddress: form.physicaladdress,
      phoneNumber: form.phonenumber,
      emailAddress: form.emailaddress,
      rating: Number(form.rating) || 0,
    };

    try {
      // if (editingHotelId) {
      //   await axios.put(`${API_URL}/${editingHotelId}`, payload);
      // } else {
      //   await axios.post(API_URL, payload);
      // }

      setShowModal(false);
      setEditingHotelId(null);
      setForm({
        name: "",
        description: "",
        imagegallery: "",
        amenities: "",
        physicaladdress: "",
        phonenumber: "",
        emailaddress: "",
        roomtypes: "",
        rating: "",
      });

      console.log(payload);

      // dispatch(fetchHotels());
      dispatch(addHotel(payload));
    } catch (err) {
      console.error("Failed to submit hotel:", err);
      alert("Failed to submit hotel.");
    }
  };

  const overlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.modalOverlay)) {
      setShowModal(false);
      setEditingHotelId(null);
    }
  };

  const amenitiesOptions = ["WiFi", "Pool", "Parking", "Gym", "Spa"];
  const roomTypesOptions = ["Single", "Double", "Suite", "Family"];

  return (
    <>
      <Navbar />

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

        {showModal && (
          <div className={styles.modalOverlay} onClick={overlayClick}>
            <div className={styles.modal} role="dialog" aria-modal="true">
              <h2>{editingHotelId ? "Edit Hotel" : "Add New Hotel"}</h2>
              <form onSubmit={onSubmit} className={styles.modalForm}>
                <InputField
                  type="text"
                  field={form.name}
                  setField={(v) => setForm({ ...form, name: String(v) })}
                  placeholder="Hotel Name"
                  label="Hotel Name"
                  for="hotel-name"
                />
                <InputField
                  type="textarea"
                  field={form.description}
                  setField={(v) => setForm({ ...form, description: String(v) })}
                  placeholder="Description"
                  label="Description"
                  for="description"
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
                          setForm({ ...form, imagegallery: images.join(",") });
                        }}
                        placeholder={`Image URL ${idx + 1}`}
                      />
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
                  ))}
                  <button
                    type="button"
                    className={styles.addImageButton}
                    onClick={() =>
                      setForm({
                        ...form,
                        imagegallery: form.imagegallery
                          ? form.imagegallery + ","
                          : "",
                      })
                    }
                  >
                    Add Image
                  </button>
                </div>

                {/* Amenities Dropdown */}
                <div className={styles.dropdownWrapper}>
                  <label>Amenities</label>
                  <div
                    className={styles.dropdownHeader}
                    onClick={() => setAmenitiesOpen(!amenitiesOpen)}
                  >
                    {form.amenities
                      ? form.amenities.split(",").join(", ")
                      : "Select amenities"}
                    <span className={styles.arrow}>
                      {amenitiesOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {amenitiesOpen && (
                    <div className={styles.dropdownList}>
                      {amenitiesOptions.map((a) => (
                        <label key={a} className={styles.dropdownItem}>
                          <input
                            type="checkbox"
                            checked={form.amenities.split(",").includes(a)}
                            onChange={(e) => {
                              const selected = form.amenities
                                ? form.amenities.split(",")
                                : [];
                              if (e.target.checked) selected.push(a);
                              else selected.splice(selected.indexOf(a), 1);
                              setForm({
                                ...form,
                                amenities: selected.join(","),
                              });
                            }}
                          />
                          {a}
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
                    {form.roomtypes
                      ? form.roomtypes.split(",").join(", ")
                      : "Select room types"}
                    <span className={styles.arrow}>
                      {roomTypesOpen ? "▲" : "▼"}
                    </span>
                  </div>
                  {roomTypesOpen && (
                    <div className={styles.dropdownList}>
                      {roomTypesOptions.map((r) => (
                        <label key={r} className={styles.dropdownItem}>
                          <input
                            type="checkbox"
                            checked={form.roomtypes.split(",").includes(r)}
                            onChange={(e) => {
                              const selected = form.roomtypes
                                ? form.roomtypes.split(",")
                                : [];
                              if (e.target.checked) selected.push(r);
                              else selected.splice(selected.indexOf(r), 1);
                              setForm({
                                ...form,
                                roomtypes: selected.join(","),
                              });
                            }}
                          />
                          {r}
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
                  label="Rating"
                  for="rating"
                />
                <InputField
                  type="text"
                  field={form.physicaladdress}
                  setField={(v) =>
                    setForm({ ...form, physicaladdress: String(v) })
                  }
                  placeholder="Address"
                  label="Address"
                  for="physicaladdress"
                />
                <InputField
                  type="text"
                  field={form.emailaddress}
                  setField={(v) =>
                    setForm({ ...form, emailaddress: String(v) })
                  }
                  placeholder="Email"
                  label="Email"
                  for="emailaddress"
                />
                <InputField
                  type="text"
                  field={form.phonenumber}
                  setField={(v) => setForm({ ...form, phonenumber: String(v) })}
                  placeholder="Phone"
                  label="Phone"
                  for="phonenumber"
                />

                <div className={styles.modalButtons}>
                  <Button type="submit" width={130}>
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

      <Footer />
    </>
  );
}
