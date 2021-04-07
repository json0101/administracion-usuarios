import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';

export default function UpdateRole() {

    const [role, setRole] = useState({});
    const [description, setDescription] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const {id} = useParams();

    useEffect(() => {

        if(!id) {
            cleanRol();
            return;
        }

        apiFetch.getAuth("role/" + id)
        .then(data => {
            if(data.ok) {                
                setRole(data.role);
                setDescription(data.role.role_description);
            }
        })
    },[id]);

    const handleCreateRole = (e) => {
        e.preventDefault();

        if(!id) { 
            apiFetch.postAuth("role/create", 
                {
                    role_description: description,
                    user_id_created: 1
                }
            )
            .then(data => {
                setValidationMessage(data.message);
            });
        }

        if(id) {
            apiFetch.putAuth("role/update", 
            {
                role_id: role.role_id,
                role_description: description,
                user_id_updated: 1    
            })
            .then(data => {
                setValidationMessage(data.message);
            });
        }
    };

    const cleanRol = () => {
        setDescription("");
    }

    return (
        <>
            <div className="rigth-panel">
                <form onSubmit={handleCreateRole}>
                    <div className="form">
                        
                        <div className="form-field">
                            <label htmlFor="role-description">Role</label>
                            <input type="text" id='role-description' onChange={(e) => {setDescription(e.target.value)}} value={description}/>
                        </div>
                        <div><label>{validationMessage}</label></div>
                        <button className="btn primary" type='submit'>Guardar</button>
                    </div>
                </form>
            </div>
        </>
    );
}