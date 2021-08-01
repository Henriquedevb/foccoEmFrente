import React from 'react';
import Activity from '../Activity/Activity';
import './style.css';

export const Pipe = ({ activities, status, onDelete }) => {
    const activitiesList =
        activities && activities.filter((a) => a.status === status);

        const onDeleteActivity = (activity) => {
            if(onDelete) {
                onDelete(activity)
            }
        }

    const title =
        status === 0
            ? 'Aguardando'
            : status === 1
            ? 'Em andamento'
            : 'Concluido';

    return (
        <div className={`pipe pipe-${status}`}>
            <span className="pipe-title">
                {title} / {activitiesList.length}
            </span>
            {activitiesList.map((activity, index) => {
                return <Activity activity={activity} key={index} onDelete={onDeleteActivity} />;
            })}
        </div>
    );
};

export default Pipe;
