import React, { useState } from 'react';
import api from '../../services/api';
export default function Login({history}) {
    const [email, setEmail] = useState('');


    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        localStorage.setItem('user', _id);
        history.push('./dashboard');
    }
    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
   
    return (
        <>
            <p>
                exiba seu <strong>spot</strong> e ache <strong>desenvolvedores</strong> para trabalhar na sua empresa!
      </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    place="insira seu email"
                    value={email}
                    onChange={handleEmailChange} />
                <button className="btn" type="submit">Entrar</button>
            </form>

        </>
    )
}