import React from 'react'
import Header from './Header';

const Covers = (props) => {
    const { covers } = props;
    if (!covers || covers.length === 0) return <p>Can not find any covers, sorry</p>;
    console.log(covers)
    return (
        <React.Fragment>
            <div className="container">
            <div className="row row-cols-2">
            {covers.map((cover) => {
                return(
                    <div key = {cover.id} className="card col embed-responsive embed-responsive-16by9">
                        {/* <img src="" className="card-img-top" alt="..."/>  */}
                        {/* <iframe className="embed-responsive-item" src={cover.video} allowFullScreen></iframe>
                         */}
                         <video controls>
                         <source src={cover.video} type="video/mp4"/>
                         </video>
                            <div className="card-body">
                                <h5 className="card-title">{cover.song}</h5>
                                    <p className="card-text">{cover.coverer.username}</p>
                                        <a href="#" className="btn btn-primary">Like</a>
                            </div>
                            
                    </div>
                    /* <div key = {cover.id} className='col'>
                        {cover.song}
                    </div> */
                   
                )
            })}
            </div>
            </div>
            
        </React.Fragment>
    )
};

export default Covers