import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App';
import '../../App.css';

const Profile = () => {
    const [pic, setPic] = useState([])
    const { state, dispatch } = useContext(UserContext);
    console.log(state)
    let renderItem;
    useEffect(() => {
        fetch('http://localhost:5000/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            method: "post"
        })
            .then(res => res.json())
            .then(result => {
                setPic(result.mypost)
            })
            .catch(err => {
                console.log("error", err)
            })
    }, [])

    if (pic === 'undefined') {
        renderItem = <h1 className="brand-logo" style={{ textAlign: "center", alignContent: "center", color: "#f5114a" }}>Fetching Data</h1>
    } else if (pic.length == 0) {
        renderItem = <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: 'space-around',
                margin: "18px 0px"
            }}>
                <div>
                    <h4>{state ? state.name : "Loading"}</h4>
                    <h5 className="brand-logo" style={{ fontSize: "28px" }}>{state ? state.email : "Loading"}</h5>
                    <div style={{ display: 'flex', justifyContent: "space-between", width: "108%" }}>
                        <h6 className="brand-logo" style={{ fontSize: "28px" }}>{pic ? pic.length : "0"} Posts</h6>
                    </div>
                </div>
            </div>
        </div>
    } else {
        renderItem = <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: 'space-around',
                margin: "18px 0px"
            }}>
                <div>
                    <h4 className="brand-logo" style={{ fontSize: "28px" }}>{state ? state.name : "Loading"}</h4>
                    <h5 className="brand-logo" style={{ fontSize: "28px" }}>{state ? state.email : "Loading"}</h5>
                    <div style={{ display: 'flex', justifyContent: "space-between", width: "108%" }}>
                        <h6 className="brand-logo" style={{ fontSize: "28px" }}>{pic ? pic.length : "0"} Posts</h6>
                    </div>
                </div>
            </div>
            <div className="gallery home1">
                {pic.map(item => {
                    console.log(item);
                    // console.log(item.photo.split("/")[7].split(".")[1]);
                    // console.log(pic.length);
                    return (
                        <div className="row">
                        <div>
                            {item.photo.split("/")[7].split(".")[1] == "mp4"? <iframe src={item.photo} alt={item.title} key={item._id} 
                            style={{height:"160px", width:"250px"}}
                            /> :
                            <img className="item" src={item.photo} alt={item.title} key={item.title}
                            style={{height:"160px", width:"220px"}}
                            />
                            }
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    }


    return renderItem
}

export default Profile