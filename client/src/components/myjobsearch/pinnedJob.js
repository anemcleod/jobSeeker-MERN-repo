import React, {useState} from 'react';

const PinnedJob = ({job, index}) => {
    const [expand, setExpand] = useState(false);

    const toggleDescription = () => {
        setExpand(!expand);
    } 

    return (
            <div className="job-container drop-shadow">
                    <button className="card-btn pin-job"><div className="seeker-delete-icon"></div></button>
                    

                    <h2>{job.title.replace(/<.?strong>/g, '')}</h2>
                    <p className="primary-info">{job.company}</p>
                    

                    <div className="secondary-info">
                        <p><span className="seeker-location-icon"></span>{job.location}</p>
                        {job.contract ? <p><span className="seeker-briefcase-icon"></span>{job.contract.replace(/_/g, ' ')}</p> : null}
                    </div>
                    

                    <div className="tertiary-info">
                        <p>{job.date.replace(/T.*/g, '')}</p>
                       <a target="_blank" href={job.link}><p>via link</p></a>
                    </div>
                    

                    <div className={expand ? "job-description" : "job-description hide-job-description" }>
                        {job.description.replace(/<.?strong>/g, '')}
                    </div>
                    
                    <button onClick={toggleDescription}className="card-btn card-btn-expand"><div className={expand ? "seeker-chevron-down-icon rotate" : "seeker-chevron-down-icon"}></div></button>
            </div>
    )


}

export default  PinnedJob;