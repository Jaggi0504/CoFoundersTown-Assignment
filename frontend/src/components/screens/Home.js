import React, {useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import { useHistory,Link } from 'react-router-dom';

const Home = () =>{
    const [data,setData] = useState([]);
    const {state,dispatch} = useContext(UserContext)

    const history = useHistory()
    useEffect(() => {
        if(!state){
            history.push('/signin')
        }
        fetch('http://localhost:5000/allpost',{
            headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(result =>{
            setData(result.posts)
        })
        .catch(err => console.log(err))
    }, [])

    const deletePost = postId =>{
        fetch(`http://localhost:5000/deletepost/${postId}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(result =>{
            const newData = data.filter(item =>{
                return item._id !== result.result._id
            })
            setData(newData)
        })
        .catch(err => console.log(err))  
    }



    return (
        <div className="home">
        {
            data.map(item =>{
                return (
                    <div className="card home-card" key={item._id}>
                    <h5><Link to={item.postedBy._id!==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
                    {
                    item.postedBy._id == state._id
                        ?                                 
                    <i className="material-icons" style={{float:'right'}} onClick={()=>deletePost(item._id)}>delete</i>
                    :
                    ""
                    }
                    </h5>
                    <div className="card-image">
                    {item.photo.split("/")[7].split(".")[1] == "mp4"? <iframe src={item.photo} alt={item.title} key={item._id} 
                            style={{height:"300px", width:"520px"}}
                            /> :
                            <img className="item" src={item.photo} alt={item.title} key={item.title}
                         
                            />
                }
                    </div>
                    <div className="card-content">      
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    </div>
                    </div>                                
                )
            })
        }

        </div>
                );

    }
 

export default Home