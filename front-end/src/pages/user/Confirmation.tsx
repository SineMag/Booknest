import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

type IconProps = { size?: number; color?: string; className?: string };

const CheckCircle = ({
  size = 24,
  color = "#4BB543",
  className,
}: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <path
      d="M9 12.5l1.8 1.8L15 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const Confirmation: React.FC = () => {
  return (
    <>
    
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#f5f6fa",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "360px",
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          {/* Centered Tick Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <CheckCircle size={80} color="black" />
          </div>

          <h2 style={{ marginBottom: "1rem", color: "black" }}>
            Booking Confirmed!
          </h2>
          <p style={{ marginBottom: "1.5rem", color: "black" }}>
            Thank you for your booking, your reservation has been successfully
          </p>

          {/* Buttons Horizontal with increased gap */}
          <div
            style={{
              display: "flex",
              //   justifyContent: "center",
              justifyContent: "space-between",
                          gap: "2rem", // increased gap between buttons
           
            }}
          >
            <Link to="/my-bookings" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "1rem 1.25rem",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                View Bookings
              </button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "1rem 1.25rem",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
