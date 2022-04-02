import { useEffect, useState } from 'react'
import './chat.css'
import ScrollToBottom from 'react-scroll-to-bottom';
export function Chat(props){
    const [message,setMessage] = useState()
    const [currentMes,setCurrentMes] = useState([])
    const [sending,setSending] = useState(false)
    useEffect(() =>{
        if(props.allMes.length !== 0){
            if(props.from === props.selected || sending){
                props.allMes.map((mess) =>{
                    if(mess.to === props.selected || mess.from === props.selected){
                        setCurrentMes([...currentMes,mess.mes])
                    }
                })
                console.log(props.allMes)
                setSending(false)
            }
        }
    },[props.allMes])
    useEffect(() =>{
       const changeSel = []
       if(props.allMes.find(el => el.to === props.selected || el.from === props.selected)){
            props.allMes.map((mess) =>{
                if(mess.to === props.selected){
                    changeSel.push(mess.mes)
                }
                if(mess.from === props.selected){
                    changeSel.push(mess.mes)
                }
        })
        setCurrentMes(changeSel)
       }
       else{
           setCurrentMes([])
       }


    },[props.selected])

    const onsub = (e) =>{
        e.preventDefault()
        props.setAllMess(nw => [...nw,{mes:message,to:props.selected}])
        var today = new Date()
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        props.socket.emit('send',{from:props.cur,to:props.selected,content:message,time:time},() => setMessage(""))
        setSending(true)
        e.target.reset()
    }
    return (
        <div className='outerChat'>
            <div className='chat rounded p-2'>
                <ScrollToBottom className = "messageContainer">
                    {
                        currentMes.map((mess,i) =>(
                            <div className='chat_inner shadow-sm' key={i}>{mess}</div>
                        ))
                    }
                </ScrollToBottom>
            </div>
            <form className='d-flex' onSubmit={onsub}>
                <input type='text' className='send' onChange={(e) => setMessage(e.target.value)}/>
                <button>Send</button>
            </form>
        </div>
    )
}