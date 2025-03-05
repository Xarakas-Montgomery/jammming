import React , { useState } from "react";
import styles from "./SearchBar.module.css";

export const SearchBar = (props) => {

  const [term, setTerm] = useState("");

  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };

  const passTerm = () => {
    props.onSearch(term);
  };

  return (
    <div className={styles.SearchBar}>
      <input type="text" placeholder="Enter a song, album, or artist" onChange={handleTermChange} />
      <button className={styles.SearchButton} onClick={passTerm}>Search</button>
    </div>
  );
};