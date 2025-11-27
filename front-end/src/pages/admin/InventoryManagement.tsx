import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import styles from "./inventory.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";

/** Type for hotel returned by backend */
type Hotel = {
  _id?: string;
  name: string;
  description?: string;
  price?: number | string;
  location?: string;
  imageUrl?: string;
  createdBy?: string;
  createdAt?: string;
};

export default function InventoryManagement(): JSX.Element {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    imageUrl: "",
  });

  const [editingHotelId, setEditingHotelId] = useState<string | null>(null);

  const API_URL = "https://booknestapi.netlify.app/accomodations";

  /** Fetch all hotels from backend */
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

  /** Open modal for editing a hotel */
  const openModalForEdit = (hotel: Hotel & { _id: string }) => {
    setForm({
      name: hotel.name,
      description: hotel.description ?? "",
      price: hotel.price?.toString() ?? "",
      location: hotel.location ?? "",
      imageUrl: hotel.imageUrl ?? "",
    });
    setEditingHotelId(hotel._id);
    setShowModal(true);
  };

  const deleteHotel = async (hotelId?: string) => {
    if (!hotelId) {
      console.error("Hotel ID is missing, cannot delete");
      return;
    }

    try {
      await axios.delete(
        `https://booknestapi.netlify.app/accomodations/${hotelId}`,
        { withCredentials: true }
      );
      // refresh hotels after deletion
      fetchHotels();
    } catch (err) {
      console.error("Failed to delete hotel:", err);
    }
  };


  /** Handle add/update form submission */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: form.price === "" ? undefined : Number(form.price),
      };

      if (editingHotelId) {
        // Update existing hotel
        await axios.put(`${API_URL}/${editingHotelId}`, payload);
      } else {
        // Add new hotel
        await axios.post(API_URL, payload);
      }

      setShowModal(false);
      setEditingHotelId(null);
      setForm({
        name: "",
        description: "",
        price: "",
        location: "",
        imageUrl: "",
      });
      await fetchHotels();
    } catch (err) {
      console.error("Failed to submit hotel:", err);
      alert("Failed to submit hotel.");
    }
  };

  const overlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.modalOverlay)) {
      setShowModal(false);
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

        {/* Hotel Cards */}
        <div className={styles.grid}>
          {hotels.map((h, index) => {
            const key = h._id ?? `${h.name}-${index}`;
            return (
              <div key={key} className={styles.card}>
                <img
                  src={h.imageUrl ?? "/placeholder-hotel.jpg"}
                  alt={h.name}
                />
                <h3>{h.name}</h3>
                {h.location && <p>{h.location}</p>}
                {h.price !== undefined && (
                  <p className={styles.price}>R {h.price}</p>
                )}

                <div className={styles.cardButtons}>
                  <Button
                    type="button"
                    width={80}
                    onClick={() =>
                      openModalForEdit(h as Hotel & { _id: string })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    width={80}
                    onClick={() => deleteHotel(h._id!)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className={styles.modalOverlay} onClick={overlayClick}>
            <div className={styles.modal} role="dialog" aria-modal="true">
              <h2>{editingHotelId ? "Edit Hotel" : "Add New Hotel"}</h2>
              <form onSubmit={onSubmit}>
                <InputField
                  type="text"
                  field={form.name}
                  setField={(value) =>
                    setForm({ ...form, name: String(value) })
                  }
                  placeholder="Hotel Name"
                  label="Hotel Name"
                  for="hotel-name"
                />
                <InputField
                  type="text"
                  field={form.description}
                  setField={(value) =>
                    setForm({ ...form, description: String(value) })
                  }
                  placeholder="Short description"
                  label="Description"
                  for="hotel-description"
                />
                <InputField
                  type="number"
                  field={form.price}
                  setField={(value) =>
                    setForm({ ...form, price: String(value) })
                  }
                  placeholder="Price per night"
                  label="Price"
                  for="hotel-price"
                />
                <InputField
                  type="text"
                  field={form.location}
                  setField={(value) =>
                    setForm({ ...form, location: String(value) })
                  }
                  placeholder="Location"
                  label="Location"
                  for="hotel-location"
                />
                <InputField
                  type="text"
                  field={form.imageUrl}
                  setField={(value) =>
                    setForm({ ...form, imageUrl: String(value) })
                  }
                  placeholder="Image URL"
                  label="Image URL"
                  for="hotel-image"
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
