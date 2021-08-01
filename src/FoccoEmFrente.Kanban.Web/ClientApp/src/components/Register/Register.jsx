import React, { useState, useContext } from 'react';
import './style.css';

import IconEmail from '../../assets/icon-email.svg';
import IconPassword from '../../assets/icon-password.svg';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import Label from '../Label/Label';
import { AlertContext } from '../Alert/Alert';


function Register({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const setAlert = useContext(AlertContext);


    const onRegister = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                ConfirmPassword: checkPassword,
            }),
        });

        const responseContent = await response.json();

        if (!response.ok) {
            setAlert(Array.isArray(responseContent) ? responseContent.join(" ") : responseContent);
            return;
        }

        localStorage.setItem('token', responseContent);
        history.push('/');
    };

    const onVoltar = () => {
        history.push('/login');
    };

    return (
        <div className="register-container">
            <p>
                Crie uma conta no <strong>Sunday.com</strong>
            </p>

            <form onSubmit={onRegister} className="form">
                <Label htmlFor="email" text="E-mail" />
                <InputText
                    icon={IconEmail}
                    type="email"
                    text="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Label htmlFor="password" text="Senha" />
                <InputText
                    icon={IconPassword}
                    type="password"
                    text="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Label htmlFor="check-password" text="Confirmar senha" />
                <InputText
                    icon={IconPassword}
                    type="password"
                    text="Confirmar senha"
                    value={checkPassword}
                    onChange={(event) => setCheckPassword(event.target.value)}
                />

                <Button
                    className="button-register"
                    text="Criar sua conta"
                    type="submit"
                />

                <Button
                    className="button-login"
                    onClick={onVoltar}
                    text="Voltar"
                />
            </form>
        </div>
    );
}

export default Register;
