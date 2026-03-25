import Tag from "../../components/Tag/Tag";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Gallery from "../../components/Gallery/Gallery";
import IconButton from "../../components/Iconbutton/Iconbutton";
import { SlShare } from "react-icons/sl";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Button from "../../components/Button/Button";
import Map, { type Hotel } from "../../components/map/Map";
import styles from "./AccomodationDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccomodationById } from "../../features/accomodationSlice";
import Spinner from "../../components/Spinner";

const hotels: Hotel[] = [
  { id: 1, name: "Hotel 1", position: [420, 120], address: "Average" },
  { id: 2, name: "Hotel 2", position: [100, 120], address: "Good" },
  { id: 3, name: "Hotel 3", position: [300, 120], address: "Bad" },
];

export default function AccomodationDetails() {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector(
    (state: RootState) => state.accomodation,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAccomodationById(id));
    }
  }, [id]); // Load initial liked state from localStorage

  useEffect(() => {
    if (current?.id) {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        const favSet = new Set(JSON.parse(stored));
        setLiked(favSet.has(current.id));
      }
    }
  }, [current?.id]);

  const toggleLike = () => {
    if (!current?.id) return;

    const stored = localStorage.getItem("favorites");
    const favSet = stored ? new Set(JSON.parse(stored)) : new Set();
    const currentId = current.id;

    if (favSet.has(currentId)) {
      favSet.delete(currentId);
      setLiked(false);
    } else {
      favSet.add(currentId);
      setLiked(true);
    }

    localStorage.setItem("favorites", JSON.stringify([...favSet]));
  };

  const handleShare = async () => {
    const shareData = {
      title: current.name,
      text: `Check out ${current.name} - ${current.description}`,
      url: window.location.href,
    };

    try {
      // Try using Web Share API first (mobile devices)
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`,
        ); // Show success message

        const successMessage = document.createElement("div");
        successMessage.textContent = "Hotel link copied to clipboard!";
        successMessage.className = `${styles.toastMessage} ${styles.toastSuccess}`;
        document.body.appendChild(successMessage); // Remove message after 3 seconds

        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 3000);
      }
    } catch (error) {
      console.error("Error sharing:", error); // Show error message

      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Failed to share hotel. Please try again.";
      errorMessage.className = `${styles.toastMessage} ${styles.toastError}`;
      document.body.appendChild(errorMessage); // Remove message after 3 seconds

      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    }
  };

  return (
    <div
      className="accomodationPage"
      style={{ marginTop: "80px", padding: "2rem" }}
    >
            
      <main style={{ flex: 1 }}>
                
        {loading ? (
          <Spinner />
        ) : (
          <>
                        
            <div className="row">
                            
              <div className="col-6">
                                
                <div className={styles.titleRow}>
                                    
                  <h1 className={styles.title}>{current.name}</h1>
                                    
                  <IconButton icon={SlShare} onClick={handleShare} />
                                  
                </div>
                                
                <p className={styles.description}>{current.description}</p>
                              
              </div>
                            
              <div className="col-6">
                                
                <Map hotels={hotels} center={[-29, 24]} />
                              
              </div>
                          
            </div>
                        
            <div className="row" style={{ alignItems: "center" }}>
                            
              <div className="col-6">
                                
                <div style={{ display: "flex", margin: "1rem 0" }}>
                                    
                  {current.amenities.map((amenity: string) => (
                    <Tag text={amenity} key={amenity} />
                  ))}
                                  
                </div>
                              
              </div>
                            
              <div className="col-6">
                                
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                                    
                  <Link to={`/user-booking?accommodationId=${current.id}`}>
                                        <Button width={100}>BOOK NOW</Button>
                                      
                  </Link>
                                    {/* FAVORITE BUTTON */}
                                    
                  <button
                    onClick={toggleLike}
                    style={{
                      background: liked ? "#4A90E2" : "transparent",
                      border: "1px solid #4A90E2",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: liked ? "white" : "#4A90E2",
                      transition: "all 0.2s ease",
                    }}
                  >
                                        {liked ? <FaHeart /> : <FaRegHeart />}
                                        {liked ? "Saved" : "Save"}
                                      
                  </button>
                                  
                </div>
                              
              </div>
                          
            </div>
                        
            <div className="row">
                            
              <div className="col-6">
                                
                <Gallery images={current.imagegallery} />
                              
              </div>
                            
              <div className="col-6">
                                
                <h2 style={{ padding: ".5rem 1rem" }}>Reviews</h2>
                                
                <ReviewCard
                  reviewText="Great stay.."
                  reviewer="M.S Mwelase"
                  starRatings={3.5}
                  date="12 Dec 2023"
                />
                              
              </div>
                          
            </div>
                      
          </>
        )}
              
      </main>
          
    </div>
  );
}
