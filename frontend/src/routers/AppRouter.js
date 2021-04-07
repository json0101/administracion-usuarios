import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import DashboardRoutes from './DashboardRoutes';

export default function AppRouter() {

    return (
        <>
            <BrowserRouter>
                
                <Switch>
                    <Route path="/login" exact component={LoginScreen}>
                    </Route>
                    <Route path="/" component={DashboardRoutes}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}