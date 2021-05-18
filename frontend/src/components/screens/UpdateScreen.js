import React, { useEffect, useState } from 'react';
import {apiFetch} from '../../helpers/ApiFetch';
import {useParams} from 'react-router-dom';

const UpdateScreen = () => {
    const [screen, setScreen] = useState({});
    const [description, setDescription] = useState("");
    const [aplications, setAplications] = useState([]);
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");
    const [aplicationId, setAplicationId] = useState(0);
    const {id} = useParams();

    useEffect(() => {
        apiFetch.getAuth(`aplication/resume`)
            .then(data => {
                console.log(data);
                setAplications(data.aplications);
            });
    }, []);

    useEffect(() => {

        if(!id) {
            cleanScreen();
            return;
        }

        apiFetch.getAuth(`screen/${id}`)
            .then(data => {
                if(data.ok) {
                    setScreen(data.screen);
                    setActive(data.screen.active);
                    setDescription(data.screen.screen_description);
                }
            })
    }, [id])

    const handleCreateScreen = (e) => {
        e.preventDefault();

        if(!id) {
            apiFetch.postAuth('screen/create', {
                screen_description: description,
                aplication_id: aplicationId,
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
            apiFetch.putAuth("screen/update", 
            {
                screen_id: screen.screen_id,
                screen_description: description,
                active: active,
                user_id_updated: 1
            })
            .then(data => {
                setMessage(data.message);
            });
        }
    };

    const cleanScreen = () => {
        setDescription("");
        setActive(false);    
    }

    return (
        <>
            <div className="rigth-panel">
                <h1>Crear nueva pantalla</h1>
                <form onSubmit={handleCreateScreen}>
                    <div className="form">
                        <div className="form-field">
                            <label htmlFor='screen_description'></label>
                            <input type="text" id="screen_description" value={description} onChange={(e) => { setDescription(e.target.value);}}/>
                        </div>

                        <div className="form-field">
                            <label>Aplicacion ID</label>
                            <select value={aplicationId} onChange={(e) => { setAplicationId(e.target.value) }}>
                                <option value="0">-----select-----</option>
                                { 
                                    aplications.map(a => {
                                        return <option key={a.aplication_id} value={a.aplication_id}>{a.aplication_description}</option>;
                                    })
                                } 
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="screen_active">Activo</label>
                            <input type="checkbox" id="screen_active" checked={active} onChange={(e) => { setActive(e.target.checked); } }/>
                        </div>

                        <div><label>{message}</label></div>
                    </div>

                    <button className="btn primary" type="submit" onSubmit={handleCreateScreen}>Guardar</button>
                </form>
            </div>
        </>
    )
}

export default UpdateScreen;
