import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./Gallery.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function Gallery() {
  const galleryImages = [
    "https://visiteasterncape.co.za/wp-content/uploads/2019/10/145298060-1.jpg",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://i.ytimg.com/vi/Zpyy57tm784/maxresdefault.jpg",
    "https://images.ctfassets.net/w65k7w0nsb8q/7uh1XQiFPOOYCkcOsIoEAa/45c9a284649f10becf4e80f0a5800011/Lagoon-suite-stor.jpg?w=3840&q=75&fm=webp",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/520558938.jpg?k=58593d588f8b89fe6c421b9a7a7e4f97de9ca8ec4903522bfd3974499b8c192b&o=",
    "https://images.ctfassets.net/w65k7w0nsb8q/7uh1XQiFPOOYCkcOsIoEAa/45c9a284649f10becf4e80f0a5800011/Lagoon-suite-stor.jpg?w=3840&q=75&fm=webp",
    "https://images.ctfassets.net/w65k7w0nsb8q/7uh1XQiFPOOYCkcOsIoEAa/45c9a284649f10becf4e80f0a5800011/Lagoon-suite-stor.jpg?w=3840&q=75&fm=webp"
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maxVisible = 6;

  const visibleImages = galleryImages.slice(0, maxVisible);
  const remainingCount = galleryImages.length - maxVisible;

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const showPrev = () => {
    if (activeIndex !== null)
      setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = () => {
    if (activeIndex !== null)
      setActiveIndex((activeIndex + 1) % galleryImages.length);
  };

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50; // swipe distance threshold

      if (diff > threshold) showNext(); // swipe left → next
      else if (diff < -threshold) showPrev(); // swipe right → previous
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <div className={styles.gallery}>
        {visibleImages.map((url, index) => (
          <div
            key={index}
            className={styles['gallery-img']}
            style={{ backgroundImage: `url("${url}")` }}
            onClick={() => openModal(index)}
          >
            {index === maxVisible - 1 && remainingCount > 0 && (
              <div
                className={styles.overlay}
                onClick={(e) => { e.stopPropagation(); openModal(index); }}
              >
                +{remainingCount} more
              </div>
            )}
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className={styles.modal}
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
            <div className="img-container">
                <img
              src={galleryImages[activeIndex]}
              alt={`Gallery ${activeIndex + 1}`}
              width="100%"
            />
            </div>
            
            <IoClose className={styles['close-btn']} onClick={closeModal} />
            {galleryImages.length > 1 && (
              <>
                <button className={`${styles['nav-btn']} ${styles.prev}`} onClick={showPrev}><BsChevronLeft size={30} /></button>
                <button className={`${styles['nav-btn']} ${styles.next}`} onClick={showNext}><BsChevronRight size={30}/></button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
