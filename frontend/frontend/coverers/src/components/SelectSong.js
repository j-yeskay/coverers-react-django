import React from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../SelectSong.css';
import axiosInstance from "../axios";


export default function SelectSong(){

    axiosInstance
    .get(
        `getcurrentuser/`,
        {headers:{
            'Authorization': "JWT " + 
            localStorage.getItem('access_token')}})
            .then((res) => {
                setUserid(res.data);
            })
    

    const [userId, setUserid] = useState('');

    const [songs, setSongs] = useState([]);

    const history = useNavigate();

    const [text, setText] = useState('');

    const [isHovering, setIsHovering] = useState(false);

    const onClickHandler = (song) => {
        console.log('Clicked!')
        setText(song.data.name)
        setSongs([])
    }


    const onChangeHandler = (text) => {
        setText(`${text}`)

        if (text.length > 0) {

            const loadSongs = async () => {
                const response = await axios.get(

                    `https://spotify23.p.rapidapi.com/search/`,

                    {

                        params: { q: `${text}`, type: 'tracks' },

                        headers: {
                            'X-RapidAPI-Key': '5c8fdacffamsh282445e3edbbd5ep170085jsn34f9d4804491',
                            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                        }
                    }
                )
                // console.log(response.data.tracks.items)
                setSongs(response.data.tracks.items)
            }
            loadSongs();
            // })
        }
    }

    const handleClick = () => {
        const song = document.getElementById('song').value.trim();
        if (song.length != 0){
            history('/upload', {state:[song, userId]});
        }
        else{
            alert('Select a SONG!')
        }
    }

    return(
        <div>
            <Header />
            <center>
                <br />
                <div className="row">
                <h3 className="col-8"><u>Step 1</u> : Select The Song</h3>
                <button className="col-2 btn btn-danger" onClick={() => handleClick()}>Go To Next Step</button>
                </div>
                <hr />
                <div className="card" style={{width:"1000px", padding:"10px"}}>
                    <input className="form-control"
                        style={{ width: '980px' }}
                        autoComplete="off"
                        type="text"
                        list="songs"
                        name="song"
                        id="song"
                        placeholder="Search For The Song"
                        onChange={(event) => onChangeHandler(event.target.value)}
                        onBlur={() => setTimeout(() => {
                            setSongs([]);
                        }, 100)}
                        value={text} />
                    {songs && songs.map((song, index) =>
                        <div
                            className="song"
                            style={{ width: '980px' }}
                            key={index}
                            onClick={() => onClickHandler(song)}
                        >
                            {song.data.name}
                        </div>
                    )}
                </div>
            </center>
            <br />

        </div>
        
    )
}