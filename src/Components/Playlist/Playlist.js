import React from "react";
import { Tracklist } from "../Tracklist/Tracklist.js";
import styles from "./Playlist.module.css";

export const Playlist = (props) => {

  const handleNameChange = ({ target }) => {
    props.onNameChange(target.value);
  }

  return (
      <div className={styles.Playlist}>
        <h2>My Playlist</h2>
        <input type="text"  defaultValue={"New Playlist"} 
        onChange={handleNameChange} />
        <Tracklist 
        userSearchResults={props.playlistTracks} 
        onRemove={props.onRemove}
        isRemoval={false}
        />
        <button className={styles.PlaylistSave} onClick={props.onSave}>
          Save to Spotify
        </button>
      </div>
  );
};