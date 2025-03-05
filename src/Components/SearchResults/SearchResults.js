import React from "react";
import { Tracklist } from "../Tracklist/Tracklist.js";
import styles from "./SearchResults.module.css";

export const SearchResults = (props) => {

  return (
    <div className={styles.SearchResults}>
      <h2>Search Results</h2>
      <Tracklist  
        userSearchResults={props.userSearchResults} 
        isRemoval={true}
        onAdd={props.onAdd}
        //onRemove={props.onRemove}
        />
    </div>
  );
};