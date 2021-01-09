import React, {useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import { useHistory,Link } from 'react-router-dom';

const WithOutLogin = () =>{
    const [data,setData] = useState([]);
    const {state,dispatch} = useContext(UserContext)

    const history = useHistory()
    useEffect(() => {
        if(!state){
            // history.push('/signin')
            fetch('http://localhost:5000/allpost2')
            .then(res => res.json())
            .then(result =>{
                console.log(result)
                setData(result.posts)
            })
            .catch(err => console.log(err))
        }
    }, [])





    return (
        <div className="home">
        {
            data.map(item =>{
                return (
                    <div className="card home-card" key={item._id}>
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
 

export default WithOutLogin