import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import styles from "./inventory.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";

type Hotel = {
  id: number;
  name: string;
  description: string;
  imageGallery: string[];
  amenities: string[];
  physicalAddress: string;
  phoneNumber: string;
  emailAddress: string;
  roomTypes: string[];
  rating: number;
};

export default function InventoryManagement(): JSX.Element {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageGallery: "",
    amenities: "",
    physicalAddress: "",
    phoneNumber: "",
    emailAddress: "",
    roomTypes: "",
    rating: "",
  });

  const [editingHotelId, setEditingHotelId] = useState<number | null>(null);

  const API_URL = "https://booknestapi.netlify.app/accomodations";

  /** Fetch hotels from backend */
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Hotel[]>(API_URL);
      setHotels(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load hotels:", err);
      setError("Failed to load hotels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();

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
      imageGallery: hotel.imageGallery.join(", "),
      amenities: hotel.amenities.join(", "),
      physicalAddress: hotel.physicalAddress,
      phoneNumber: hotel.phoneNumber,
      emailAddress: hotel.emailAddress,
      roomTypes: hotel.roomTypes.join(", "),
      rating: hotel.rating.toString(),
    });
    setEditingHotelId(hotel.id);
    setShowModal(true);
  };

  /** Delete hotel */
  const deleteHotel = async (hotelId: number) => {
    try {
      await axios.delete(`${API_URL}/${hotelId}`);
      fetchHotels();
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
      imageGallery: form.imageGallery.split(",").map((s) => s.trim()),
      amenities: form.amenities.split(",").map((s) => s.trim()),
      physicalAddress: form.physicalAddress,
      phoneNumber: form.phoneNumber,
      emailAddress: form.emailAddress,
      roomTypes: form.roomTypes.split(",").map((s) => s.trim()),
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
        imageGallery: "",
        amenities: "",
        physicalAddress: "",
        phoneNumber: "",
        emailAddress: "",
        roomTypes: "",
        rating: "",
      });

      fetchHotels();
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
              <div className={styles.imageGallery}>
                {h.imageGallery?.length > 0 ? (
                  h.imageGallery.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${h.name} ${index + 1}`}
                      className={styles.hotelImage}
                    />
                  ))
                ) : (
                  <img
                    src="/placeholder-hotel.jpg"
                    alt={h.name}
                    className={styles.hotelImage}
                  />
                )}
              </div>

              <h3>{h.name}</h3>
              <p>{h.physicalAddress}</p>
              <p>{h.emailAddress}</p>
              <p>Rating: {h.rating}</p>

              <div className={styles.cardButtons}>
                <Button
                  type="button"
                  width={80}
                  onClick={() => openModalForEdit(h)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  width={80}
                  onClick={() => deleteHotel(h.id)}
                >
                  Delete
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
                <InputField
                  type="text"
                  field={form.name}
                  setField={(v) => setForm({ ...form, name: String(v) })}
                  placeholder="Hotel Name"
                  label="Hotel Name"
                  for="hotel-name"
                />
                <InputField
                  type="text"
                  field={form.description}
                  setField={(v) => setForm({ ...form, description: String(v) })}
                  placeholder="Description"
                  label="Description"
                  for="hotel-description"
                />
                <InputField
                  type="text"
                  field={form.imageGallery}
                  setField={(v) =>
                    setForm({ ...form, imageGallery: String(v) })
                  }
                  placeholder="Image URLs (comma separated)"
                  label="Image Gallery"
                  for="hotel-images"
                />
                <InputField
                  type="text"
                  field={form.amenities}
                  setField={(v) => setForm({ ...form, amenities: String(v) })}
                  placeholder="Amenities (comma separated)"
                  label="Amenities"
                  for="hotel-amenities"
                />
                <InputField
                  type="text"
                  field={form.physicalAddress}
                  setField={(v) =>
                    setForm({ ...form, physicalAddress: String(v) })
                  }
                  placeholder="Address"
                  label="Address"
                  for="hotel-address"
                />
                <InputField
                  type="text"
                  field={form.phoneNumber}
                  setField={(v) => setForm({ ...form, phoneNumber: String(v) })}
                  placeholder="Phone"
                  label="Phone Number"
                  for="hotel-phone"
                />
                <InputField
                  type="text"
                  field={form.emailAddress}
                  setField={(v) =>
                    setForm({ ...form, emailAddress: String(v) })
                  }
                  placeholder="Email"
                  label="Email Address"
                  for="hotel-email"
                />
                <InputField
                  type="text"
                  field={form.roomTypes}
                  setField={(v) => setForm({ ...form, roomTypes: String(v) })}
                  placeholder="Room Types (comma separated)"
                  label="Room Types"
                  for="hotel-rooms"
                />
                <InputField
                  type="number"
                  field={form.rating}
                  setField={(v) => setForm({ ...form, rating: String(v) })}
                  placeholder="Rating"
                  label="Rating"
                  for="hotel-rating"
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
