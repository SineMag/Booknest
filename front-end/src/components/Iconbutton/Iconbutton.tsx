import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "../Iconbutton/Iconbutton.module.css";

export default function HeartButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [liked, setLiked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLiked(!liked);
    if (onClick) onClick(e);
  };

  return (
    <div className={styles.heartbutton}>
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
