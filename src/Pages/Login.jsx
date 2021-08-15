import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Login.css';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_ID;
const SPOTIFY_AUTHORIZE_ENDPOINT = " https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "https://generasi-gigih-homework-theta.vercel.app/";
const SPACE_DELIMITER = "%20";
const SCOPE = ["playlist-modify-private"];
const SCOPES_URL_PARAMS =   SCOPE.join(SPACE_DELIMITER);


export default function Login() {

    const [token, setToken] = useState("");
    const [search, setSearch] = useState("");
    const [datas, setDatas] = useState([]);
    const [isToggled, setToggled] = useState(false);

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`
    }


    const getTokenFromUrl = (hash) => {
        const stringAfterHastag = hash.substring(1);
        const paramInUrl = stringAfterHastag.split("&");
        const paramSplitUp = paramInUrl.reduce((acc, currentValue) => {
        const [key, value] = currentValue.split("=");
        acc[key] = value;
        return acc;
        }, {});
        return paramSplitUp;
    };


    useEffect(() => {
        if (window.location.hash) {
        const { access_token } = getTokenFromUrl(window.location.hash);
        setToken(access_token);
        }
    }, []);

    const handleSearch = async () => {
		try {
			let url =
				"https://api.spotify.com/v1/search?q=" + search + "&type=track,artist";
			await axios
				.get(url, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					setDatas(res.data.tracks.items);
				});
		} catch (err) {
			console.error(err);
		} finally {
			console.log(datas);
		}
	}
    
    const changeText = () => {
        setToggled(!isToggled);
    };


    return (
        <div>
            <div>
                <button onClick={handleLogin} className="login" type="submit">Log In</button>
            </div>
            <div>
                <input
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    value={search}
                />
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="searchResult">
                {datas.map((data, index) => {
                    return (
                    <div className="cardList" key={data.id}>
                        <img src={data.album.images[2].url} alt={data.name} />
                        <p>Title: {data.name}</p>
                        <p>No: {index + 1}</p>
                        <p>album: {data.album.name}</p>
                        <p>Release Date: {data.album.release_date}</p>
                        {/* button */}
                        <button onClick={() => changeText()} >{isToggled ? "SELECTED" : "NOT SELECTED"}</button>
                        
                    </div>
                    );
                })}
            </div>
        </div>
        
    )
}
