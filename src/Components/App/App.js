import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";
import styles from "./App.module.css";
import { Spotify } from "../../util/Spotify/Spotify.js";

const App = () => {
  const [searchResults, setSearchResults] = useState([
    {id: 1, name: "Song A", artist: "Artist A", album: "Album A"},
    {id: 2, name: "Song B", artist: "Artist B", album: "Album B"},
    {id: 3, name: "Song C", artist: "Artist C", album: "Album C"},
    {id: 4, name: "Song D", artist: "Artist D", album: "Album D"}
  ]);

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    {id: 10, name: "Song A", artist: "Artist A", album: "Album A"},
    {id: 20, name: "Song B", artist: "Artist B", album: "Album B"}
  ]);
  
  const addTrack = track => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  /*const addTrack = (track) => {
    setPlaylistTracks(prevTracks => {
      if (prevTracks.some(t => t.id === track.id)) {
        console.log("Track already exists");
        return prevTracks;
      } else {
        return [...prevTracks, track];
      };
    });
  };*/

  const removeTrack = track => {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  };

  const updatePlaylistName = name => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist")
      setPlaylistTracks([])
    });
  };

  const search = (term) => {
    Spotify.search(term).then(result => setSearchResults(result))
    console.log(term);
  };

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar onSearch={search}/>
        <div className={styles['App-playlist']}>
          <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} 
          onRemove={removeTrack} onNameChange={updatePlaylistName}
          onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
};

export default App;

