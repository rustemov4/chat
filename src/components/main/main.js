import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../chat/chat';
import { Navbar } from '../navbar/navbar';
import './main.css'
import { io } from 'socket.io-client';
var socket
export function Main(){
    const [user,setUser] = useState("")
    const navigate = useNavigate();
    const [users,setUsers] = useState([])
    const [currentPerson,setCurrentPerson] = useState()
    const [allMes,setAllMess] = useState([])
    const [from,setFrom] = useState()
    const isFirstRender = useRef(true)
    axios.defaults.withCredentials = true
    useEffect(() =>{   

        axios.get(('http://localhost:4000/main'),{
        }).then((data) =>{
            if(!data.data.user){
                navigate('/')
            }
            else{
                setUser(data.data.user)
            }
        })
        axios.get('http://localhost:4000/allUsers',{
        }).then((data) =>{
            setUsers(data.data.data.rows)
        })
        socket = io.connect('http://localhost:4000')
        socket.on('newM',data =>{
            setFrom(data.from)
            setAllMess(nw => [...nw,data])
        })
    },[])

    useEffect(() =>{
        if (isFirstRender.current) {
            isFirstRender.current = false 
            return;
          }
        socket.emit('con',{user:user},(err) =>{
            if(err){
                console.log("err emit")
            }
        })
    },[user])
    return (
        <div>
           <Navbar user = {user}/>
           <div className='d-flex'>
            <div className='side'>
                {
                    users.map(element =>(
                        element.login !== user
                        ?
                        <h3 
                            className='p-2 mt-2 d-flex rounded allUsers' 
                            style={{backgroundColor:currentPerson === element.login ? "#ebebeb" : "#f7f7f7"}}
                            onClick={() => setCurrentPerson(element.login)}>
                            {element.login}
                        </h3>
                        : 
                        ""
                    ))
                }
            </div>
            <div className='mt-2 theChat'>
                {
                    currentPerson
                    ?
                        <Chat socket = {socket} cur = {user} selected = {currentPerson} setAllMess = {setAllMess} allMes = {allMes} from = {from}/>
                    :
                        ""
                } 
            </div>
           </div>
        </div>
    )
}