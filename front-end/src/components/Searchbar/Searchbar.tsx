import Reac, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Searchbar.module.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  debounce?: number;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  debounce = 300, // optional delay
}: SearchBarProps) {
  const [value, setValue] = useState("");

  // Debounce search callback
  useEffect(() => {
    const delay = setTimeout(() => {
      if (onSearch) onSearch(value);
    }, debounce);

    return () => clearTimeout(delay);
  }, [value, debounce, onSearch]);

  const clearInput = () => {
    setValue("");
    if (onSearch) onSearch("");
  };

    return (
      <div className="seshi">
        <div className={styles.container}>
          <FaSearch className={styles.icon} />

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className={styles.input}
          />

          {value && (
            <button className={styles.clearBtn} onClick={clearInput}>
              ✖
            </button>
          )}
        </div>
      </div>
    );
}
