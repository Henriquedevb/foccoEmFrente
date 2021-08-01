import React, { useState } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Home from './components/Home/Home';
import Layout from './components/Layout/layout';
import Login from './components/Login/login';
import Register from './components/Register/Register';
import './App.css';

import Alert, { AlertContext } from './components/Alert/Alert';

export default function App() {
    const [alert, setAlert] = useState('');

    const onClickAlert = () => setAlert('');

    return (
        <Layout>
            <Alert alert={alert} onClick={onClickAlert} />
            <AlertContext.Provider value={setAlert}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Redirect to="/" />
                </Switch>
            </AlertContext.Provider>
        </Layout>
    );
}
