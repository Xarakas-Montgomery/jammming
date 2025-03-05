import React from "react";
import styles from "./Track.module.css";

export const Track = (props) => {
  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className={styles.TrackAction} onClick={passTrack}>
          +
        </button>
      );
    } else {
      return (
        <button className={styles.TrackAction} onClick={passTrackToRemove}>
          -
        </button>
      );
    }
  }; 

  const passTrack = () => {
    props.onAdd(props.track);
  }

  const passTrackToRemove = () => {
    props.onRemove(props.track);
  }
  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        {/* <h3><!-- track name will go here --></h3> */}
        <h3>{props.track.name}</h3>
        {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {/* <button class="Track-action"><!-- + or - will go here --></button> */}
      {renderAction()}
    </div>
  );
}

