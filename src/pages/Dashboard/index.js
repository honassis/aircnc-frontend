import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';
export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    const user_id = localStorage.getItem('user');
        const socket = useMemo(()=>socketio('http://192.168.2.249:3333', {
            query: { user_id },
        }),[user_id]);
    useEffect(() => {
        
        socket.on('booking_request', data => {
            setRequests([...requests, data])
        });

    }, [requests,socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
           

        }
        loadSpots();
    }, [])
    async function handleAceppt(id){
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id !== id));
    }
   async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }
    return (
        <>
            <ul className="notifications">
                {
                    requests.map(request => (
                        <li key={request._id}>
                            <p>
                                <strong>{request.user.email} </strong>
                                está solicitando uma reserva em
                    <strong> {request.spot.company} </strong>
                                para data:<strong> {request.date}</strong>
                            </p>
                            <button className="accept" onClick={()=>handleAceppt(request._id)}>ACEITAR</button>
                            <button className="decline" onClick={()=>handleReject(request._id)}>REJEITAR</button>
                        </li>
                    ))
                }
            </ul>
            <ul className="spot-list">
                {spots.map((spots) => (
                    <li key={spots._id}>
                        <header style={{ backgroundImage: `url(${spots.thumbnail_url})` }} />
                        <strong>{spots.company}</strong>
                        <span>{spots.price ? `R$${spots.price}/dia` : 'Gratuito'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar Novo Spot</button>
            </Link>
        </>
    )
}