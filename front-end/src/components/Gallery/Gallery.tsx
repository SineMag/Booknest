import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./Gallery.module.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  images: string[];
}

export default function Gallery(props: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maxVisible = 6;

  const visibleImages = props.images.slice(0, maxVisible);
  const remainingCount = props.images.length - maxVisible;

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const showPrev = () => {
    if (activeIndex !== null)
      setActiveIndex(
        (activeIndex - 1 + props.images.length) % props.images.length
      );
  };

  const showNext = () => {
    if (activeIndex !== null)
      setActiveIndex((activeIndex + 1) % props.images.length);
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
            className={styles["gallery-img"]}
            style={{ backgroundImage: `url("${url}")` }}
            onClick={() => openModal(index)}
          >
            {index === maxVisible - 1 && remainingCount > 0 && (
              <div
                className={styles.overlay}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(index);
                }}
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
          <div
            className={styles["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="img-container">
              <img
                src={props.images[activeIndex]}
                alt={`Gallery ${activeIndex + 1}`}
                width="100%"
              />
            </div>

            <IoClose className={styles["close-btn"]} onClick={closeModal} />
            {props.images.length > 1 && (
              <>
                <button
                  className={`${styles["nav-btn"]} ${styles.prev}`}
                  onClick={showPrev}
                >
                  <BsChevronLeft size={30} />
                </button>
                <button
                  className={`${styles["nav-btn"]} ${styles.next}`}
                  onClick={showNext}
                >
                  <BsChevronRight size={30} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
