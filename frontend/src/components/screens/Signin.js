import React, {useContext, useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Signin = () =>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const PostData = () =>{
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                username
            })
        })
        .then(res => res.json())
        .then(data => {
            
            if(data.error){
                M.toast({html:data.error, classes:'#d32f2f red darken-2'})
            }else{
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"User Signed In", classes:'#00e676 green accent-3'})
                history.push('/')
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(state){
            // dispatch({type:'LOGOUT'})
            history.push('/')
        }
    }, [])
    return (
    <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Blogs</h2>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}/>
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #0d47a1 blue darken-1" onClick={()=>PostData()}>Login</button>
            <h4 style={{color:"lightgreen"}}> 
                Don't have an Account? <hr/>
            <Link to='/signup' className="brand-logo">Click Here to Register</Link>
            </h4>
        </div>
    </div>)
}

export default Signin