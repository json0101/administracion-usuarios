import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';
import {useDispatch} from 'react-redux';
import { login } from '../../actions/auth';

export default function LoginScreen() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch()


    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        if(username === "" )
        {
            setMessage("Ingrese el usuario");
            return;
        }

        if(password === "") {
            setMessage("Ingrese el password");
            return;
        }
        
        apiFetch.post("login",
        {
            username,
            password
        }).then(data => {
            if(data.ok === true) {
                console.log(data);
                const {jwt, user_id, user_name} = data.user;
                localStorage.setItem("jwt", data.user.token+"")
                history.push('/');
                dispatch(login(user_id, user_name));
            } else {
                setMessage(data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
        
    };

    return (
        <>
            <div className="auth_main">
                <div className="login">
                    <h1>Bienvenido</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form">
                            <div className="form-field">
                                <label htmlFor="user">Usuario</label>
                                <input className="login-input" onChange={(e) => { setUserName(e.target.value); }} type="text" id="user"/>
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Contraseña</label>
                                <input className="login-input" onChange={(e) => { setPassword(e.target.value); }} type="password" id="password"/>
                            </div>
                            <NavLink to="/login">¿Olvido su contraseña?</NavLink>
                            <div className="message">
                                <label className="message-error">{message}</label>
                            </div>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}