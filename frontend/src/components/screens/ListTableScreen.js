import React,{useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {apiFetch} from '../../helpers/ApiFetch';

const ListTableScreen = () => {

  const [screens, setScreens] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
      updateScreens();
  }, []);

  const updateScreens = () => {
      apiFetch.getAuth("screen")
      .then(data =>  {
          console.log("data", data)
          if(data?.ok) {
              setScreens(data.screens);
          }
      })
      .catch(error => {
          setValidationMessage(error.message);
      });
  };

  const handleEdit = (screen) => {
      if(screen)
          history.push('screens/update/'+screen.screen_id);
  }

  const handleDelete = (screen) => {
      if(!screen) {
          return;
      }

      apiFetch.deleteAuth(`screen/delete/${screen.screen_id}`)
          .then(data => {
              setValidationMessage(data.message);
              if(data.ok) {
                  updateScreens();
              }
          })
  }

  return (
      <>
          <div className='rigth-panel'>
          <div>
              <h1>Pantallas</h1>
          </div>
          <NavLink exact to='/screens/create'>Nueva Pantalla</NavLink>
          <table className="table">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Pantalla Nombre</th>
                      <th>Activo</th>
                      <th>Fecha de Creación</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {
                      screens.map(screen => {
                          return (
                              <tr key={screen.screen_id}>
                                  <td>{screen.screen_id}</td>
                                  <td>{screen.screen_description}</td>
                                  <td>{screen.active+""}</td>
                                  <td>{screen.creation_date}</td>
                                  <td className="button-panel">
                                      <button className="btn secondary" onClick={() => handleEdit(screen) }>Edit</button>
                                      <button className="btn danger" onClick={() => handleDelete(screen) }>Delete</button>
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

export default ListTableScreen;
