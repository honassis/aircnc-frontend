import React, { useState , useMemo} from 'react';
import './styles.css';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
export default function New({history}) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]
    )
   async function handleSubmit(e) {
       e.preventDefault();
       const data = new FormData();
       data.append('thumbnail', thumbnail);
       data.append('company', company);
       data.append('price', price);
       data.append('techs', techs);
        const user_id = localStorage.getItem('user');
       await api.post('/spots',data,{
            headers: {user_id}
        });
        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail': ''}
            >
                <input type="file" onChange={e=> setThumbnail(e.target.files[0])}/>
            <img src={camera} alt="Select Img"/>
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            <label htmlFor="techs">SUAS TECNOLOGIAS * <span>(valor entre virgulas)</span></label>
            <input
                id="techs"
                placeholder="suas tecnologias"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />
            <label htmlFor="price">VALOR DA DIÁRIA * <span>(vazio ficará gratuíto)</span></label>
            <input
                id="price"
                placeholder="valor cobrado "
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Enviar</button>
        </form>
    )
    }