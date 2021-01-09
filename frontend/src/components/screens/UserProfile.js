import React, { useEffect,useState,useContext } from 'react'
import {useParams} from 'react-router-dom'
import { UserContext } from '../../App'

const UserProfile = () =>{
    const [userProfile, setUserProfile] = useState(null)
    const [showFollow,setShowFollow] = useState(true)
    const {state,dispatch} = useContext(UserContext)
    const {userId} = useParams()

    let renderItem;
    useEffect(()=>{
        fetch(`http://localhost:5000/user/${userId}`,{
            headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                setUserProfile(result)
            })
            .catch(err => {
                console.log("error",err)
            })
        },[])

    if(userProfile === null){
        renderItem=<h1 className="brand-logo" style={{color:"red", textAlign:"center", justifyContent:"center"}}>Fetching Information</h1>
    } 
   else{
      renderItem =   <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent:'space-around',
            margin:"18px 0px"
        }}>
            <div>
            <h4 className="brand-logo" style={{fontSize:"28px"}}>{userProfile.user.name}</h4>
            <h4 className="brand-logo" style={{fontSize:"28px"}}>{userProfile.user.email}</h4>
                <div style={{display:'flex',justifyContent:"space-between",width:"108%"}}>
                    <h6 className="brand-logo" style={{fontSize:"28px"}}>{userProfile.posts.length} Posts</h6>  
                </div>
            </div>
        </div>
        <div className="gallery">
            {userProfile.posts.map(item =>{
                return (
                    <div>
                    {item.photo.split("/")[7].split(".")[1] == "mp4"? <iframe src={item.photo} alt={item.title}
                    style={{height:"160px", width:"250px"}}
                    /> :
                    <img className="item" src={item.photo} alt={item.title} key={item.title} 
                    style={{height:"160px", width:"250px"}}
                    />
                    }
                    </div>
                )
            })}
        </div>
    </div>
    }
        

    return renderItem
}

export default UserProfile