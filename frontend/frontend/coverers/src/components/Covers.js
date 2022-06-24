import React, { useState } from 'react'
import axiosInstance from '../axios';



const Covers = (props) => {
    axiosInstance
        .get(
            `getcurrentuser/`,
            {
                headers: {
                    'Authorization': "JWT " +
                        localStorage.getItem('access_token')
                }
            })
        .then((res) => {
            setUserid(res.data);
        })


    const [userId, setUserid] = useState('');



    const { covers } = props;

    if (!covers || covers.length === 0) {
        return <p>Can not find any covers, sorry</p>
    };



    const likeHandler = (cover_id) => {
        axiosInstance
            .post(`like/${cover_id}/`, {
                headers: {
                    Authorization:
                        "JWT " + localStorage.getItem("access_token"),
                },
            })
            .then((res) => {
                let likes = document.getElementById(cover_id).innerHTML;
                likes = parseInt(likes) + 1;
                document.getElementById(cover_id).innerHTML = likes;

            });
        const like_status = 'like-status ' + cover_id;

        if (document.getElementById(like_status).style.color == "white") {
            document.getElementById(like_status).style.color = "black";
        }
        else {
            document.getElementById(like_status).innerHTML = "You Liked This";
        }
    }

    const unlikeHandler = (cover_id) => {
        console.log('clciked');
        axiosInstance
            .post(`unlike/${cover_id}/`, {
                headers: {
                    Authorization:
                        "JWT " + localStorage.getItem("access_token"),
                },
            })
            .then((res) => {
                let likes = document.getElementById(cover_id).innerHTML;
                likes = parseInt(likes) - 1;
                document.getElementById(cover_id).innerHTML = likes;


            })
        const like_status = 'like-status ' + cover_id;
        document.getElementById(like_status).style.color = "white";
    }

    return (
        <React.Fragment>
            <div className="container">
            <div className="row row-cols-2">


            {covers.map((cover) => {

                const likes = cover.likes;
                let already_liked = {};
                for (let like = 0; like < likes.length; like++) {
                    if (likes[like].user == userId) {
                        already_liked[cover.id] = true;
                    }
                    else {
                        already_liked[cover.id] = false;
                    }
                }

                const like_id = 'like ' + cover.id;
                const unlike_id = 'unlike ' + cover.id;
                const like_status = 'like-status ' + cover.id;
                console.log(cover.video);
                return(
                    <div key={cover.id} className="card col embed-responsive embed-responsive-16by9">
                         <video controls>
                         <source src={cover.video} type="video/mp4"/>
                         </video>
                            <div className="card-body">
                                <h5 className="card-title">{cover.song}</h5>
                                    <p className="card-text">{cover.coverer.username}</p>
                            <div id="row" className='row'>
                                <>
                                    <button id={like_id} onClick={() => likeHandler(cover.id)} className="btn btn-primary col m-2" ><i className="bi bi-hand-thumbs-up"></i></button>
                                    <button id={unlike_id} onClick={
                                        () =>
                                            unlikeHandler(cover.id)}
                                        className="btn btn-success col m-2"><i className="bi bi-hand-thumbs-down"></i></button>
                                </>

                                <a id={cover.id} className='btn btn-warning col m-2'>{cover.likes.length}</a>

                                {already_liked[cover.id] ? <p id={like_status}>You liked this</p> : <p id={like_status}></p>}
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            </div>

        </React.Fragment>
    )
};

export default Covers

