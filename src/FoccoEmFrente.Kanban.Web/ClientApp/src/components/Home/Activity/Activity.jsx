import React, { useState } from 'react';
import './style.css';
import Button from '../../Button/Button';

function Activity({ activity, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(activity.title);

    const setActivityTitle = (value) => {
        setTitle(value);
    };

    const onBlurTitle = () => {
        setEditing(false);
        activity.title = title;

        if (onUpdate) onUpdate(activity);
    };

    const onEditMode = () => {
        setEditing(true);
    };

    const onDeleteActivity = () => {
        if (onDelete) {
            onDelete(activity);
        }
    };

    const onDragActivity = (event) => {
        event.dataTransfer.setData('activityId', activity.id);
    };

    return (
        <div
            draggable={!editing}
            className="activity"
            onDragStart={onDragActivity}
        >
            <Button
                text="X"
                className="btn-delete-activitty"
                onClick={onDeleteActivity}
            />

            {editing ? (
                <input
                    className="input-solo"
                    value={' '}
                    onBlur={onBlurTitle}
                    autoFocus
                    onChange={(event) => setActivityTitle(event.target.value)}
                />
            ) : (
                <span onDoubleClick={onEditMode} className="activity-body">
                    {activity.title}
                </span>
            )}
        </div>
    );
}
export default Activity;
