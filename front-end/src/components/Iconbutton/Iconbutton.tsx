import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "../Iconbutton/Iconbutton.module.css";

interface HeartButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function HeartButton({ onClick, className }: HeartButtonProps) {
  const [liked, setLiked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLiked(!liked);
    if (onClick) onClick(e);
  };

  return (
    <div className={`${styles.heartbutton} ${className || ""}`}>
      <button
        className={`${styles.heartIcon} ${liked ? styles.liked : ""}`}
        onClick={handleClick}
        title={liked ? "Unlike" : "Like"}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  );
}
