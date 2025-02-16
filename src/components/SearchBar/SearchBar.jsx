import  { useState } from "react";
import styles from "./SearchBar.module.css"

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return alert("Enter text to search for.");
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search images and photos"
          autoFocus
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </header>
  );
}
