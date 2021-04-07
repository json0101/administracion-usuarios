import React,{useState, useEffect} from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';

export default function ListTableUser() {
    
    const [roles, setRoles] = useState([]);
    const [validationMessage, setValidationMessage] = useState("");
    
    const history = useHistory();
    
    useEffect(() => {
        updateRoles();
    },[]);

    
    const updateRoles= () => {
         
        apiFetch.getAuth("role")
        .then(data => {
            if(data.ok) {
                setRoles(data.roles);
            }
        })
    }

    const handleEdit = (role) => {
        if(role)
        history.push(`roles/update/${role.role_id}`);
    }

    const handleDelete = (role) => {
        if(!role) {
            return;
        }

        apiFetch.deleteAuth(`role/delete/${role.role_id}`)
        .then(data => {
            setValidationMessage(data.message);
            if(data.ok) {                
                updateRoles();
            }
        })
        
    }

    return (<>
        <div className='rigth-panel'>
            <NavLink exact to='/roles/create'>Nuevo Rol</NavLink>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role Nombre</th>
                        <th>Activo</th>
                        <th>Fecha de Creación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map(role => {
                            return (
                                <tr key={role.role_id}>
                                    <td>{role.role_id}</td>
                                    <td>{role.role_description}</td>
                                    <td>{role.active+""}</td>
                                    <td>{role.creation_date}</td>
                                    <td className="button-panel">
                                        <button className="btn secondary" onClick={() => handleEdit(role) }>Edit</button>
                                        <button className="btn danger" onClick={() => handleDelete(role) }>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <label>{validationMessage}</label>
        </div>
    </>);
}