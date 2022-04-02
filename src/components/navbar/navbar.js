import axios from 'axios'
import './navbar.css'
import { useNavigate } from 'react-router-dom';
export function Navbar(props){
    const navigate = useNavigate();
    const logout = (event) =>{
        event.preventDefault()
        axios.get('http://localhost:4000/logout',{
        }).then(data =>{
            console.log(data)
            navigate('/')
        })
    }
    return(
        <div className="bg-light p-2 d-flex justify-content-between shadow-sm">
            <div className="logo">
                <h3>{props.user}</h3>
            </div>
            <div className='p-2'>
                <form onSubmit={logout}>
                    <button className='logout'>Log out</button>
                </form>
            </div>
        </div>
    )
}