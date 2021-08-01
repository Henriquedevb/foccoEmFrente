import React from 'react';
import './style.css';
import Button from '../../Button/Button';

function Activity({ activity, onDelete }) {
    const onDeleteActivity = () => {
        if (onDelete) {
            onDelete(activity);
        }
    };

    return (
        <div className="activity">
            <Button
                text="X"
                className="btn-delete-activitty"
                onClick={onDeleteActivity}
            />
            <span className="activity-body"> {activity.title} </span>
        </div>
    );
}

export default Activity;
