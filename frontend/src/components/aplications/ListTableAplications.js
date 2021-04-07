import React, { useState, useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';

export const ListTableAplications = () => {

    const [aplications, setAplications] = useState([]);
    const [validationMessage, setValidationMessage] = useState("");

    const history = useHistory();

    useEffect(() => {
        updateAplications();
    }, []);

    const updateAplications = () => {
        apiFetch.getAuth("aplication")
        .then(data =>  {
            console.log("data", data)
            if(data?.ok) {
                setAplications(data.apps);
            }
        })
        .catch(error => {
            setValidationMessage(error.message);
        });
    };

    const handleEdit = (app) => {
        if(app)
            history.push('aplications/update/'+app.aplication_id);
    }

    const handleDelete = (app) => {
        if(!app) {
            return;
        }

        apiFetch.deleteAuth(`aplication/delete/${app.aplication_id}`)
            .then(data => {
                setValidationMessage(data.message);
                if(data.ok) {
                    updateAplications();
                }
            })
    }

    return (
        <>
            <div className='rigth-panel'>
            <div>
                <h1>Aplicaciones</h1>
            </div>
            <NavLink exact to='/aplications/create'>Nueva Aplicación</NavLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Aplicación Nombre</th>
                        <th>Activo</th>
                        <th>Fecha de Creación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        aplications.map(app => {
                            return (
                                <tr key={app.aplication_id}>
                                    <td>{app.aplication_id}</td>
                                    <td>{app.aplication_description}</td>
                                    <td>{app.active+""}</td>
                                    <td>{app.creation_date}</td>
                                    <td className="button-panel">
                                        <button className="btn secondary" onClick={() => handleEdit(app) }>Edit</button>
                                        <button className="btn danger" onClick={() => handleDelete(app) }>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <label>{validationMessage}</label>
        </div>
        </>
    )
}
