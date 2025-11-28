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
import { useNavigate, useLocation } from "react-router-dom";

export default function InventoryManagement(): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imagegallery: "",
    coverimage: "",
    videotour: "",
    amenities: "",
    physicaladdress: "",
    phonenumber: "",
    emailaddress: "",
    roomtypes: "",
    rating: "",
    checkin: "",
    checkout: "",
    totalrooms: "",
    city: "",
    province: "",
    country: "",
    googlemap: "",
    baseprice: "",
    peakprice: "",
    discount: "",
    taxes: "",
    cancellation: "",
    petpolicy: "",
    smoking: "",
  });

  const [editingHotelId, setEditingHotelId] = useState<number | null>(null);

  const API_URL = "https://booknestapi.netlify.app/accomodations";

  const dispatch = useDispatch<AppDispatch>();
  const { hotels, loading, error } = useSelector(
    (state: RootState) => state.hotels
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchHotels());
  }, []);

  // Detect ?edit=ID in URL to open modal for editing
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const editId = urlParams.get("edit");

    if (editId && hotels.length > 0) {
      const hotelToEdit = hotels.find((h) => h.id === Number(editId));
      if (hotelToEdit) openModalForEdit(hotelToEdit);
    }
  }, [hotels, location.search]);

  /** Open modal for editing hotel */
  const openModalForEdit = (hotel: Hotel) => {
    setForm({
      name: hotel.name,
      description: hotel.description,
      imagegallery: hotel.imagegallery.join(", "),
      coverimage: hotel.coverimage || "",
      videotour: hotel.videotour || "",
      amenities: hotel.amenities.join(", "),
      physicaladdress: hotel.physicaladdress,
      phonenumber: hotel.phonenumber,
      emailaddress: hotel.emailaddress,
      roomtypes: hotel.roomtypes.join(", "),
      rating: hotel.rating.toString(),
      checkin: hotel.checkin || "",
      checkout: hotel.checkout || "",
      totalrooms: hotel.totalrooms?.toString() || "",
      city: hotel.city || "",
      province: hotel.province || "",
      country: hotel.country || "",
      googlemap: hotel.googlemap || "",
      baseprice: hotel.baseprice?.toString() || "",
      peakprice: hotel.peakprice?.toString() || "",
      discount: hotel.discount?.toString() || "",
      taxes: hotel.taxes?.toString() || "",
      cancellation: hotel.cancellation || "",
      petpolicy: hotel.petpolicy || "",
      smoking: hotel.smoking || "",
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
      coverimage: form.coverimage,
      videotour: form.videotour,
      imagegallery: form.imagegallery.split(",").map((s) => s.trim()),
      amenities: form.amenities.split(",").map((s) => s.trim()),
      physicaladdress: form.physicaladdress,
      phonenumber: form.phonenumber,
      emailaddress: form.emailaddress,
      roomtypes: form.roomtypes.split(",").map((s) => s.trim()),
      rating: Number(form.rating) || 0,
      checkin: form.checkin,
      checkout: form.checkout,
      totalrooms: Number(form.totalrooms) || 0,
      city: form.city,
      province: form.province,
      country: form.country,
      googlemap: form.googlemap,
      baseprice: Number(form.baseprice) || 0,
      peakprice: Number(form.peakprice) || 0,
      discount: Number(form.discount) || 0,
      taxes: Number(form.taxes) || 0,
      cancellation: form.cancellation,
      petpolicy: form.petpolicy,
      smoking: form.smoking,
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
        coverimage: "",
        videotour: "",
        amenities: "",
        physicaladdress: "",
        phonenumber: "",
        emailaddress: "",
        roomtypes: "",
        rating: "",
        checkin: "",
        checkout: "",
        totalrooms: "",
        city: "",
        province: "",
        country: "",
        googlemap: "",
        baseprice: "",
        peakprice: "",
        discount: "",
        taxes: "",
        cancellation: "",
        petpolicy: "",
        smoking: "",
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
                  src={
                    h.coverimage ||
                    h.imagegallery[0] ||
                    "/placeholder-hotel.jpg"
                  }
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

                <InputField
                  type="textarea"
                  field={form.description}
                  setField={(v) => setForm({ ...form, description: String(v) })}
                  placeholder="Description"
                  label="Description"
                  for="description"
                />

                <InputField
                  type="text"
                  field={form.coverimage}
                  setField={(v) => setForm({ ...form, coverimage: String(v) })}
                  placeholder="Cover Image URL"
                  label="Cover Image URL"
                  for="coverimage"
                />

                <InputField
                  type="text"
                  field={form.imagegallery}
                  setField={(v) =>
                    setForm({ ...form, imagegallery: String(v) })
                  }
                  placeholder="Image URLs (comma-separated)"
                  label="Image Gallery"
                  for="imagegallery"
                />

                {/* <InputField
                  type="text"
                  field={form.videotour}
                  setField={(v) => setForm({ ...form, videotour: String(v) })}
                  placeholder="Video Tour URL"
                  label="Video Tour (optional)"
                  for="videotour"
                /> */}

                <InputField
                  type="text"
                  field={form.amenities}
                  setField={(v) => setForm({ ...form, amenities: String(v) })}
                  placeholder="Amenities (comma-separated)"
                  label="Amenities"
                  for="amenities"
                />

                <InputField
                  type="text"
                  field={form.roomtypes}
                  setField={(v) => setForm({ ...form, roomtypes: String(v) })}
                  placeholder="Room Types (comma-separated)"
                  label="Room Types"
                  for="roomtypes"
                />

                <InputField
                  type="number"
                  field={form.rating}
                  setField={(v) => setForm({ ...form, rating: String(v) })}
                  placeholder="Rating (0-5)"
                  label="Rating"
                  for="rating"
                />

                <InputField
                  type="time"
                  field={form.checkin}
                  setField={(v) => setForm({ ...form, checkin: String(v) })}
                  label="Check-in Time"
                  for="checkin"
                />

                <InputField
                  type="time"
                  field={form.checkout}
                  setField={(v) => setForm({ ...form, checkout: String(v) })}
                  label="Check-out Time"
                  for="checkout"
                />

                <InputField
                  type="number"
                  field={String(form.totalrooms)}
                  setField={(v) => setForm({ ...form, totalrooms: Number(v) })}
                  placeholder="Total Rooms"
                  label="Total Rooms"
                  for="totalrooms"
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
                  field={form.city}
                  setField={(v) => setForm({ ...form, city: String(v) })}
                  placeholder="City"
                  label="City"
                  for="city"
                />

                <InputField
                  type="text"
                  field={form.province}
                  setField={(v) => setForm({ ...form, province: String(v) })}
                  placeholder="Province"
                  label="Province"
                  for="province"
                />

                <InputField
                  type="text"
                  field={form.country}
                  setField={(v) => setForm({ ...form, country: String(v) })}
                  placeholder="Country"
                  label="Country"
                  for="country"
                />

                <InputField
                  type="text"
                  field={form.googlemap}
                  setField={(v) => setForm({ ...form, googlemap: String(v) })}
                  placeholder="Google Map URL"
                  label="Google Map URL"
                  for="googlemap"
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

                <InputField
                  type="number"
                  field={String(form.baseprice)}
                  setField={(v) => setForm({ ...form, baseprice: Number(v) })}
                  placeholder="Base Price"
                  label="Base Price (per night)"
                  for="baseprice"
                />

                <InputField
                  type="number"
                  field={String(form.peakprice)}
                  setField={(v) => setForm({ ...form, peakprice: Number(v) })}
                  placeholder="Peak Season Price"
                  label="Peak Price"
                  for="peakprice"
                />

                <InputField
                  type="number"
                  field={String(form.discount)}
                  setField={(v) => setForm({ ...form, discount: Number(v) })}
                  placeholder="Discount (%)"
                  label="Discount (%)"
                  for="discount"
                />

                <InputField
                  type="number"
                  field={String(form.taxes)}
                  setField={(v) => setForm({ ...form, taxes: Number(v) })}
                  placeholder="Taxes (%)"
                  label="Taxes (%)"
                  for="taxes"
                />

                <InputField
                  type="text"
                  field={form.cancellation}
                  setField={(v) =>
                    setForm({ ...form, cancellation: String(v) })
                  }
                  placeholder="Cancellation Policy"
                  label="Cancellation Policy"
                  for="cancellation"
                />

                <InputField
                  type="text"
                  field={form.petpolicy}
                  setField={(v) => setForm({ ...form, petpolicy: String(v) })}
                  placeholder="Pet Policy"
                  label="Pet Policy"
                  for="petpolicy"
                />

                <InputField
                  type="text"
                  field={form.smoking}
                  setField={(v) => setForm({ ...form, smoking: String(v) })}
                  placeholder="Smoking Policy"
                  label="Smoking Policy"
                  for="smoking"
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
