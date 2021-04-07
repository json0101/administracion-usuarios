import React,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar(props) {

    const {showMenu} = props;
    const [visibility, setVisibility] = useState("block");

    useEffect(() => {
        setVisibility(showMenu ? 'block' : 'none');
        
    },[showMenu]);

    return (
        <>
            <nav style={{display:visibility }}>
                <label id="l-find" htmlFor="find">Buscar</label>
                <input id="find" type="text"/>
                <ul className="menu">
                    <li>
                        <NavLink to='/users'>Aplicaciones</NavLink>
                        <ul>
                            <li><NavLink to='/aplications/create' exact activeClassName="active" >Crear Aplicación</NavLink></li>
                            <li><NavLink to='/aplications' exact activeClassName="active">Listado de aplicaciones</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/screens'>Pantallas</NavLink>
                        <ul>
                            <li><NavLink to='/screens/create' exact activeClassName="active" >Crear Pantalla</NavLink></li>
                            <li><NavLink to='/screens' exact activeClassName="active">Listado de Pantallas</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/roles'>Roles</NavLink>
                        <ul>
                            <li><NavLink to='/roles/create' exact activeClassName="active">Crear Rol</NavLink></li>
                            <li><NavLink to='/roles' exact activeClassName="active">Listado de roles</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/users'>Users</NavLink>
                        <ul>
                            <li><NavLink to='/users/create' exact activeClassName="active" >Crear Usuario</NavLink></li>
                            <li><NavLink to='/users' exact activeClassName="active">Listado de usuarios</NavLink></li>
                        </ul>
                    </li>
                    
                    <li><NavLink to='/login'>Cerrar sesion</NavLink></li>
                </ul>
            </nav>
        </>
    );
}