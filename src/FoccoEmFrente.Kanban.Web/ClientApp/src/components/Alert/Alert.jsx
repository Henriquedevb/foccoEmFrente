import React from 'react';
import Button from '../Button/Button';

const AlertContext = React.createContext(null);

function Alert({ alert, onClick }) {
    if (!alert) return null;

    return (
        <div className="modal-container">
            <div className="modal">
                <p>{alert}</p>
                <Button text="OK" onClick={onClick} />
            </div>
        </div>
    );
}

export { AlertContext, Alert as default };
