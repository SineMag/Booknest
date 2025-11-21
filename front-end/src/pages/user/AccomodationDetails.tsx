import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

export default function AccommodationDetails() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  const reviews = [
    { name: "Alice", rating: 5, comment: "Amazing stay! The view was breathtaking." },
    { name: "John", rating: 4, comment: "Very comfortable rooms and close to beach." },
    { name: "Mary", rating: 5, comment: "Perfect location and great amenities." },
  ];

  const galleryImages = [
    "https://visiteasterncape.co.za/wp-content/uploads/2019/10/145298060-1.jpg",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://i.ytimg.com/vi/Zpyy57tm784/maxresdefault.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4GtVAmlfjm1EoosyZnm6fcJycRYXV-lhvQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHcCCTSKTifICC8fCnUpzop6hMqhELMuUZlQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHcCCTSKTifICC8fCnUpzop6hMqhELMuUZlQ&s",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  ];

  // Modal functions
  const openModal = (index: number) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex((modalIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (modalIndex !== null) {
      setModalIndex((modalIndex + 1) % galleryImages.length);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (modalIndex !== null) {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "Escape") closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalIndex]);

  return (
    <div className="hotel-page">
      <div className="accommodation-wrapper">
        {/* LEFT SIDE */}
       <div className="hotel-left" style={{ padding: "20px" }}>
        <h1 className="hotel-title" style={{ paddingBottom: "10px" }}>Blue Lagoon</h1>
  <p className="hotel-description" style={{ paddingBottom: "15px" }}>
            Blue Lagoon Hotel offers stylish, comfortable rooms just steps from the beach.  
            Enjoy modern amenities, ocean views, and a relaxing stay perfect for any traveler.
          </p>

           <div className="amenities" style={{ paddingBottom: "15px" }}>
    {["Wifi", "Pool", "Parking", "Kitchen", "Aircon"].map(item => (
      <div className="amenity" key={item}>{item}</div>
    ))}
          </div>
          {/* GALLERY */}
          <div className="gallery">
            {galleryImages.slice(0, 6).map((url, index) => (
              <div
                className="gallery-img"
                key={index}
                style={{ 
                  backgroundImage: `url("${url}")`, 
                  cursor: "pointer", 
                  position: "relative",
                  height: "150px",
                  margin: "5px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  display: "inline-block",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                onClick={() => openModal(index)}
              >
                {index === 5 && galleryImages.length > 6 && (
                  <div
                    onClick={(e) => { e.stopPropagation(); openModal(5); }}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  >
                    +{galleryImages.length - 6} more
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* LIKE & SHARE BUTTONS */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => setLiked(!liked)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                color: liked ? "red" : "gray"
              }}
              title={liked ? "Unlike" : "Like"}
            >
              {liked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>

            <button
              onClick={() => alert("Share functionality coming soon!")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem"
              }}
              title="Share"
            >
              <FiShare2 />
            </button>
          </div>


        {/* RIGHT SIDE - REVIEWS */}
        <div className="hotel-right">
          <div className="details-card">
            <h3>Reviews</h3>
            {reviews.map((review, idx) => (
              <div 
                key={idx} 
                style={{ 
                  marginBottom: "12px", 
                  borderBottom: idx !== reviews.length - 1 ? "1px solid #ccc" : "none",
                  paddingBottom: "8px"
                }}
              >
                <strong>{review.name}</strong> — {"⭐".repeat(review.rating)}
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      {/* IMAGE MODAL */}
      {modalIndex !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer"
            }}
          >
            ‹
          </button>

          <img
            src={galleryImages[modalIndex]}
            alt="Hotel"
            style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }}
          />

          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer"
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
