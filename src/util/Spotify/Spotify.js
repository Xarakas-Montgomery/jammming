let accessToken;
const clientID = "e864d0e9cc814204866c553155b2b50f";
const redirectUrl = "http://localhost:3000";

export const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL =  window.location.href.match(/access_token=([^&]*)/);
        const expiresTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiresTime) {
        //Setting the access token and expiration time
            accessToken = tokenInURL[1];
            const expireIn = Number(expiresTime[1]);

        //Setting the access token to expire at the value for expiration time
            window.setTimeout(() => (accessToken = ""), expireIn * 1000);

        //Clearing the url after the access token is expired   
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }
        // Third check for the access token if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            if (!jsonResponse) {
              console.error("Response error");
            }
            return jsonResponse.tracks.items.map((t) => ({
              id: t.id,
              name: t.name,
              artist: t.artists[0].name,
              album: t.album.name,
              uri: t.uri,
            }));
          });
      },

    savePlaylist(playlistName, trackUris) {
        if(!playlistName || !trackUris) {
            return;
        }

        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` }; // Headers variable
        let userId;
        
        return fetch(`https://api.spotify.com/v1/me`, { headers: header })
        .then((response) => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            let playlistId;
            return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: 'POST',
                body: JSON.stringify({ name: playlistName }),
            })
                .then((response) => response.json())
                .then((jsonResponse) => {
                    playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: header,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackUris}),
                })
            })
        })
    }
};