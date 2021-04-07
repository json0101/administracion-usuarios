import React, { useEffect, useState } from 'react';
import {apiFetch} from '../../helpers/ApiFetch';
import {useParams} from 'react-router-dom';

export const UpdateAplication = () => {

    const [app, setApp] = useState({});
    const [description, setDescription] = useState("");
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");
    const {id} = useParams();

    useEffect(() => {

        if(!id) {
            cleanApp();
            return;
        }

        apiFetch.getAuth(`aplication/${id}`)
            .then(data => {
                if(data.ok) {
                    setApp(data.aplication);
                    setActive(data.aplication.active);
                    setDescription(data.aplication.aplication_description);
                }
            })
    }, [id])

    const handleCreateApp = (e) => {
        e.preventDefault();

        if(!id) {
            apiFetch.postAuth('aplication/create', {
                aplication_description: description,
                active: active
            })
            .then(data => {
                setMessage(data.message);            
            })
            .catch(error => {
                setMessage(error.message);
            });
        }

        if(id) {
            apiFetch.putAuth("aplication/update", 
            {
                aplication_id: app.aplication_id,
                aplication_description: description,
                active: active,
                user_id_updated: 1
            })
            .then(data => {
                setMessage(data.message);
            });
        }
    };

    const cleanApp = () => {
        setDescription("");
        setActive(false);    
    }

    return (
        <>
            <div className="rigth-panel">
                <h1>Crear nueva aplicación</h1>
                <form onSubmit={handleCreateApp}>
                    <div className="form">
                        <div className="form-field">
                            <label htmlFor='app_description'></label>
                            <input type="text" id="app_description" value={description} onChange={(e) => { setDescription(e.target.value);}}/>
                        </div>
                        
                        <div className="form-field">
                            <label htmlFor="app_active">Activo</label>
                            <input type="checkbox" id="app_active" checked={active} onChange={(e) => { setActive(e.target.checked); } }/>
                        </div>

                        <div><label>{message}</label></div>
                    </div>

                    <button className="btn primary" type="submit" onSubmit={handleCreateApp}>Guardar</button>
                </form>
            </div>
        </>
    )
}
