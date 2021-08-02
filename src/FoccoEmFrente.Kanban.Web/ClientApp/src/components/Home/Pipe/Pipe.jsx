import React from 'react';
import Activity from '../Activity/Activity';
import './style.css';

export const Pipe = ({ activities, status, onDelete, onUpdate, onActivityDrops }) => {
    const activitiesList =
        activities && activities.filter((a) => a.status === status);

    const onDeleteActivity = (activity) => {
        if (onDelete) {
            onDelete(activity);
        }
    };

    const onUpdateActivity = (activity) => {
        if(onUpdate) onUpdate(activity)
    }

    const onDragActivityOver = (event) => {
        event.preventDefault();
    }

    const onDropActivity = (event) => {
        const activityId = event.dataTransfer.getData('activityId');
        if(activityId && onActivityDrops) onActivityDrops(activityId);
    }

    const title =
        status === 0
            ? 'Aguardando'
            : status === 1
            ? 'Em andamento'
            : 'Concluido';

    return (
        <div className={`pipe pipe-${status}`} onDragOver={onDragActivityOver} onDrop={onDropActivity}>
            <span className="pipe-title">
                {title} / {activitiesList.length}
            </span>
            {activitiesList.map((activity, index) => {
                return (
                    <Activity
                        activity={activity}
                        key={index}
                        onDelete={onDeleteActivity}
                        onUpdate={onUpdateActivity}
                    />
                );
            })}
        </div>
    );
};

export default Pipe;
