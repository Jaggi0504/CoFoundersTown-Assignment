import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = () =>{
    const history = useHistory();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return  M.toast({html:"Invalid email address!",classes:'#d32f2f red darken-2'})
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                username
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                M.toast({html:data.error,classes:'#d32f2f red darken-2'})
            }else{
                M.toast({html:data.msg,classes:'#00e676 green accent-3'})
                history.push('/signin')
            }
        })
        .catch(err => console.log(err))
    }

            return( <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>Blogs</h2>
                    <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e=>setName(e.target.value)}/>
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                    <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
                    <button className="btn waves-effect waves-light #0d47a1 blue darken-4" onClick={()=> PostData()}>Signup</button>
                    <h4 style={{color:"lightgreen"}}> Already have an Account? <hr/>
                    <Link to='/signin' className="brand-logo">Click here to Login</Link>
                    </h4>
                </div>
            </div>
            );
    }




export default Signup