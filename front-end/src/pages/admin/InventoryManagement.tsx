import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import styles from "./InventoryManagement.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../features/InventoryManagementSlice";
import type { Hotel } from "../../features/InventoryManagementSlice";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function InventoryManagement(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
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

  const API_URL = "https://booknestapi.netlify.app/accomodations";

  const dispatch = useDispatch<AppDispatch>();
  const { hotels, loading, error } = useSelector(
    (state: RootState) => state.hotels
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHotels());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Open modal for editing hotel */
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

  /** Navigate to AccommodationDetails */
  const viewHotel = (id: number) => {
    navigate(`/accommodation-details/${id}`);
  };

  /** Delete hotel */
  const deleteHotel = async (hotelId: number) => {
    try {
      await axios.delete(`${API_URL}/${hotelId}`);
      dispatch(fetchHotels());
    } catch (err) {
      console.error("Failed to delete hotel:", err);
      alert("Failed to delete hotel.");
    }
  };

  /** Add or update hotel */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Partial<Hotel> = {
      name: form.name,
      description: form.description,
      imagegallery: form.imagegallery.split(",").map((s) => s.trim()),
      amenities: form.amenities.split(",").map((s) => s.trim()),
      physicaladdress: form.physicaladdress,
      phonenumber: form.phonenumber,
      emailaddress: form.emailaddress,
      roomtypes: form.roomtypes.split(",").map((s) => s.trim()),
      rating: Number(form.rating) || 0,
    };

    try {
      if (editingHotelId) {
        await axios.put(`${API_URL}/${editingHotelId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

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

      dispatch(fetchHotels());
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
                  width={80}
                  onClick={() => viewHotel(h.id)}
                >
                  <FaEye /> View
                </Button>

                <Button
                  type="button"
                  width={80}
                  onClick={() => openModalForEdit(h)}
                >
                  <FaEdit /> Edit
                </Button>

                <Button
                  type="button"
                  width={80}
                  onClick={() => deleteHotel(h.id)}
                >
                  <FaTrash /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className={styles.modalOverlay} onClick={overlayClick}>
            <div className={styles.modal} role="dialog" aria-modal="true">
              <h2>{editingHotelId ? "Edit Hotel" : "Add New Hotel"}</h2>
              <form onSubmit={onSubmit}>
                {/* Form fields */}
                <InputField
                  type="text"
                  field={form.name}
                  setField={(v) => setForm({ ...form, name: String(v) })}
                  placeholder="Hotel Name"
                  label="Hotel Name"
                  for="hotel-name"
                />
                {/* Add the rest of the InputFields as before */}
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
     
    </>
  );
}
