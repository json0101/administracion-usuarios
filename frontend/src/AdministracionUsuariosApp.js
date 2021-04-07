import React from 'react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function AdministracionUsuariosApp() {

    return (
        <Provider store={store}>
            <AppRouter></AppRouter>
        </Provider>
    );
}