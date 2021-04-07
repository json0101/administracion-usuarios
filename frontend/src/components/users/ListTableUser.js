import React,{useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';

export default function ListTableUser() {

    const [users, setUsers] = useState([]);
    const [validationMessage, setValidationMessage] = useState("");

    const history = useHistory();

    useEffect(() => {
        getUsers();
    },[]);

    const getUsers = () => {
        apiFetch.getAuth("user")
        .then(data => {            
            // only set the users when there's no error
            if (data.ok) {
                setUsers(data.users);
            }
        });
    }

    const handleEdit = (user) => {
        if(user)
            history.push(`users/update/${user.user_id}`);
    }

    const handleDelete = (user) => {
        if(user)
        {
            apiFetch.deleteAuth(`user/delete/${user.user_id}`)
            .then(data => {
                setValidationMessage(data.message);
                if(data.ok) {                
                    getUsers();
                }
            })
        }
    }

    return (
        <>
            <div className='rigth-panel'>
                <NavLink exact to='/users/create'>New User</NavLink>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Active</th>
                            <th>Date created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                
                                return (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.active+""}</td>
                                        <td>{user.creation_date}</td>
                                        <td className="button-panel">
                                            <button className="btn secondary" onClick={() => {handleEdit(user)}}>Edit</button> 
                                            <button className="btn danger" onClick={() => {handleDelete(user)}}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <label className="text-error">{validationMessage}</label>
            </div>
        </>
    )
}