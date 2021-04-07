import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';

export default function UpdateUser() {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [active, setActive] = useState(false);
    const [roleId, setRolId] = useState(0);
    const [roles, setRoles] = useState([]);
    
    const [messageValidation, setMessageValidation] = useState("");
    const {id} = useParams();

    useEffect(() => {
        if(!id) {
            cleanForm();
            return;
        }

        apiFetch.getAuth("user/" + id)
        .then(data => {
            if(data.ok) {
                setUser(data.user);
                setUserName(data.user.user_name);
                setRolId(data.user.role_id);
                setActive(data.user.active);
            }
        })
    },[id]);    
    
    useEffect(() => {
        
        apiFetch.getAuth("role/resume")
        .then(data => {
            if(data.ok) {
                setRoles([...data.roles]);
            }
        });

    }, []);

    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
    }

    const handleCreateUser = (event) => {
        event.preventDefault();

        const userUpdate = {
            user_name: userName,
            password: password,
            passwordConfirm: passwordConfirm,
            user_id_created: 1,
            role_id: roleId,
            active: active
        };

        const isNew = !id;
        
        if(isNew) {
            if( password !== passwordConfirm) {
                setMessageValidation("La contraseña no coincide");
                return;
            }

            handleUserAdd(userUpdate);
        } else {

            if(password && password!=="" && password !== passwordConfirm) {
                setMessageValidation("La contraseña no coincide");
                return;
            }

            const userUp = {...userUpdate, user_id_updated: 1, user_id: user.user_id};

            handleUserUpdate(userUp);
        }
        
    }

    const handleCheckboxChange = (event) => {
        const active = event.target.checked;
        setActive(active);
    }

    const handleUserUpdate = (user) => {
        apiFetch.putAuth("user/update", user)
        .then(data => {
            if(!data.ok) {
                setMessageValidation(data.message);
                return;
            }
            
            setMessageValidation(data.message);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleUserAdd = (user) => {
        apiFetch.postAuth("user/create", user)
        .then(data => {
            if(!data.ok) {
                setMessageValidation(data.message);
                return;
            }
            
            setMessageValidation(data.message);
        })
        .catch(error => {
            console.log(error);
        });
    } 

    const cleanForm = () => {
        setPassword("");
        setPasswordConfirm("");
        setUserName("");
        setRolId(0);
        setActive(false);
    }

    return <>
        <div className="rigth-panel">
            <form onSubmit={handleCreateUser}>
                <div className="form">
                    <div className="form-field">
                        <label htmlFor="user_name">Nombre de Usuario</label>
                        <input id="user_name" value={userName} onChange={handleUserName} type="text"/>
                    </div>
                    <div className="form-field">
                        <label>Rol</label>
                        <select value={roleId} onChange={(e) => { setRolId(e.target.value) }}>
                            <option value="0">-----select-----</option>
                            { 
                                roles.map(r => {
                                    return <option key={r.role_id} value={r.role_id}>{r.role_description}</option>;
                                })
                            } 
                        </select>
                    </div>

                    <div className="form-field">
                        <label htmlFor="user_password">Contraseña</label>
                        <input id="user_password" value={password} onChange={handlePassword} type="password"/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="user_password_confirm">Confirmación Contraseña</label>
                        <input id="user_password_confirm" value={passwordConfirm} onChange={handlePasswordConfirm} type="password"/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="user_active">Activo</label>
                        <input type="checkbox" id="user_active" checked={active} onChange={handleCheckboxChange}/>
                    </div>
                    
                    <div className='message'>
                        <label className='text-error'>{messageValidation}</label>
                    </div>
                    <button className="btn primary" type="submit" onSubmit={handleCreateUser}>Guardar</button>
                </div>
            </form>
        </div>
    </>
}