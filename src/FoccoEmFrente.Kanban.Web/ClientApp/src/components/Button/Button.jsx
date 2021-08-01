import React from 'react';
import './style.css';

function Button({ text, className, onClick}) {
    
    return (
        <div className="button-component">
            <button onClick={onClick} className={className}>{text}</button>
        </div>
    );
}

export default Button;
