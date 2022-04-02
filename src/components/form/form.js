import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Form(){
    const navigate = useNavigate();
    const[login,setLogin] = useState("")
    const[passwordd,setPasswordd] = useState("")
    const[err,setErr] = useState("")
    axios.defaults.withCredentials = true
    const submit = (event) =>{
        event.preventDefault()
        axios.post('http://localhost:4000/login',{
            login: login,
            passwordd: passwordd
        }).then(data =>{
            if(data.data.err){
                setErr("Please check login and password")   
            }
            else{
                navigate('/mainPage')
            }
        })
    }
    return(
        <div style={{padding:"10%"}}>
            <div>
                <div className='p-2'>
                    <h2>The login form</h2>
                </div>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter login"
                        name='login' onChange={(e) => {
                        setErr("")
                        setLogin(e.target.value)}}/>
                    </div>
                    <div class="form-group mt-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        name='passwordd' onChange={(e) => {
                        setErr("")    
                        setPasswordd(e.target.value)}}/>
                    </div>
                    <div className={err ? "bg-warning p-2 rounded mt-2" : ""}>
                        {err ? err : ""}
                    </div>
                    <button type="submit" class="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </div>
    )
}
