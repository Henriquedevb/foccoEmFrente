import React, { useState, useContext } from 'react';
import './style.css';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import Label from '../Label/Label';
import { AlertContext } from '../Alert/Alert';

import IconEmail from '../../assets/icon-email.svg';
import IconPassword from '../../assets/icon-password.svg';

function Login({ history }) {
    const [fomrLogin, setFomrLogin] = useState({ email: '', password: '' });
    const setAlert = useContext(AlertContext);

    const setEmail = (event) => {
        setFomrLogin({ ...fomrLogin, email: event.target.value });
    };

    const setPassword = (event) => {
        setFomrLogin({ ...fomrLogin, password: event.target.value });
    };

    const onLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(fomrLogin),
        });

        const responseContent = await response.json();
        if (!response.ok) {
            setAlert(Array.isArray(responseContent) ? responseContent.join(" ") : responseContent);
            return;
        }

        localStorage.setItem('token', responseContent);
        history.push('/');
    };

    const registerPage = () => {
        history.push('/register');
    };

    return (
        <div className="content">
            <p>
                Bem Vindo ao <strong>Sunday.com</strong>
            </p>
            <p>O melhor sistema de gerenciamento de tarefas</p>

            <form onSubmit={onLogin} className="form">
                <Label htmlFor="email" text="E-mail" />
                <InputText
                    icon={IconEmail}
                    type="email"
                    text="E-mail"
                    value={fomrLogin.email}
                    onChange={setEmail}
                />

                <Label htmlFor="password" text="Senha" />
                <InputText
                    icon={IconPassword}
                    type="password"
                    text="Senha"
                    value={fomrLogin.password}
                    onChange={setPassword}
                />

                <Button text="Entrar" type="submit" className="button-login" />

                <Button
                    onClick={registerPage}
                    className="button-register"
                    text="Registrar"
                />
            </form>
        </div>
    );
}

export default Login;
