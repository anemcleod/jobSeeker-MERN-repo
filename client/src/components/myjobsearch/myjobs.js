mport React, {useState} from 'react';
import {Draggable} from "react-beautiful-dnd";

const Job = ({job, index}) => {
const [expand, setExpand] = useState(false);

const toggleDescription = () => {
    setExpand(!expand);
} 

    return (
        <Draggable draggableId={job.id} index={index}>
            {
                (provided) => {
                    return (
                <div className="job-container drop-shadow"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    <button className="card-btn pin-job"><div className="seeker-pin-tilt-icon"></div></button>
                    <h2>{job.title.replace(/<.?strong>/g, '')}{index}</h2>
                    <p className="primary-info">{job.company.display_name}</p>
                    <div className="secondary-info">
                        <p><span className="seeker-location-icon"></span>{job.location.display_name}</p>
                        {job.contract_time ? <p><span className="seeker-briefcase-icon"></span>{job.contract_time.replace(/_/g, ' ')}</p> : null}
                    </div>
                    <div className="tertiary-info">
                        <p>{job.created.replace(/T.*/g, '')}</p>
                       <a target="_blank" href={job.redirect_url}><p>via link</p></a>
                    </div>
                    <div className={expand ? "job-description" : "job-description hide-job-description" }>
                        {job.description.replace(/<.?strong>/g, '')}
                    </div>
                    <button onClick={toggleDescription}className="card-btn card-btn-expand"><div className={expand ? "seeker-chevron-down-icon rotate" : "seeker-chevron-down-icon"}></div></button>
                </div>
                )}
            }
        </Draggable>
    )
}

export default Job;