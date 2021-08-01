import React, { useState, useEffect } from 'react';
import './style.css';
import Button from '../Button/Button';
import Pipe from './Pipe/Pipe';

function Home({ history }) {
    const [activities, setActivities] = useState([]);

    const token = localStorage.getItem('token');
    if (!token) history.push('/login');

    const loadActivities = async () => {
        const response = await fetch('/api/activities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const responseContent = await response.json();

        if (!response.ok) {
            window.alert([
                'Nao foi possivel buscar as terefas',
                responseContent,
            ]);
            return;
        }

        setActivities(responseContent);
    };

    const addActivity = async () => {
        const activity = JSON.stringify({
            title: 'nova atividade',
            status: 0,
        });

        const response = await fetch('/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: activity,
        });

        const responseContent = await response.json();

        if (!response.ok) {
            window.alert([
                'Nao foi possivel inserir a terefa',
                response.ok
                    ? null
                    : Array.isArray(responseContent)
                    ? responseContent.join(' ')
                    : responseContent,
            ]);
            return;
        }

        setActivities([...activities, response.ok ? responseContent : null]);
    };

    const deleteActivity = async (activity) => {
        console.log(activity.userId)
        const response = await fetch(`/api/activities/${activity.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        const responseContent = await response.json();

        if (!response.ok) {
            window.alert([
                'Nao foi possivel Excluir a terefa',
                response.ok
                    ? null
                    : Array.isArray(responseContent)
                    ? responseContent.join(' ')
                    : responseContent,
            ]);
            return;
        }

        setActivities(activities.filter(a => a.id !== activity.id));
    };

    const handleExit = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    useEffect(() => {
        loadActivities();
    }, []);

    return (
        <div className="canvas-container">
            <p>
                Bem vindo ao <strong>Sunday.com</strong>.
            </p>
            <p>Esse é o seu canva para organizar suas atividades.</p>

            <div className="canvas">
                {[0, 1, 2].map((status, index) => {
                    return (
                        <Pipe
                            key={index}
                            className="pipe"
                            activities={activities}
                            status={status}
                            onDelete={deleteActivity}
                        />
                    );
                })}
            </div>
            <Button
                text="Adicionar Atividade"
                onClick={addActivity}
                className="addActivity-button"
            />
            <Button
                text="SAIR"
                type="submit"
                onClick={handleExit}
                className="exit-button"
            />
        </div>
    );
}

export default Home;
