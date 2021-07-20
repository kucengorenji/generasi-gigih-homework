import React from 'react';
import './Login.css';


/*
    GET https://accounts.spotify.com/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09


*/

const CLIENT_ID = "dc0ed7403bb84c5587f67cbe75df1821";
// const clientSecret = "2c4fca51a8714b4cab1b84673c8374e2";
const SPOTIFY_AUTHORIZE_ENDPOINT = " https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/app";

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitItUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramsSplitItUp;
}

const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAMS =   SCOPES.join(SPACE_DELIMITER);


export default function Login() {

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`
    }

    return (
        <div>
            <button onClick={handleLogin} className="login" type="submit">Log In</button>
        </div>
    )
}
