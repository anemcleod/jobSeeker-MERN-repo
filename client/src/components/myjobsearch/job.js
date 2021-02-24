import React, {useState, useContext, useEffect} from 'react';

import {AuthContext} from '../../context/AuthContext';

const Job = ({job, index}) => {

    const {searchResults, setPinJob, myJobBoards} = useContext(AuthContext)
    const [expand, setExpand] = useState(false);
    const [pinned, setPinned] = useState(false);

    const toggleDescription = () => {
        setExpand(!expand);
    } 

    //open pin menu and add to selected job state
    const pinHandler = (index) => {
        setPinJob(
            {   
                showPinJob: true,
                selectedJob:  {
                                jobBoardId: null,
                                title: searchResults[index].title,
                                company: searchResults[index].company.display_name,
                                location: searchResults[index].location.display_name,
                                description: searchResults[index].description,
                                link: searchResults[index].redirect_url,
                                date: searchResults[index].created,
                                contract: searchResults[index].contract_time
                            } 
           });
    }

    //if a job is pinned or deleted, check if it matches saved jobs
    //if it does change pin icon to pinned icon
    useEffect(() =>{
        if(myJobBoards) {
          for(let i = 0; i < myJobBoards.length; i++){
              for(let k = 0; k < myJobBoards[i].jobs.length; k++){
                  if(myJobBoards[i].jobs[k].title === job.title && myJobBoards[i].jobs[k].company === job.company.display_name){
                      setPinned(true);
                      return
                  }
              }
          }  
        }
    },[myJobBoards]);

    return (
            <div className="job-container drop-shadow">
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            pinHandler(index);
                        }}
                        className="card-btn pin-job">
                        <div className={`seeker-pin-tilt-icon ${pinned ? 'seeker-pin-icon' : ''}`}></div>
                    </button>   

                    <h2>{job.title.replace(/<.?strong>/g, '')}</h2>

                    <p className="primary-info">{job.company.display_name}</p>
                    
                    <div className="secondary-info">
                        <p>
                            <span className="seeker-location-icon"></span>
                            {job.location.display_name}
                        </p>

                        {
                            job.contract_time ? (
                                <p>
                                    <span className="seeker-briefcase-icon"></span>
                                    {job.contract_time.replace(/_/g, ' ')}
                                </p> 
                            ): null
                        }
                    </div>
                
                    <div className="tertiary-info">
                        <p>{job.created.replace(/T.*/g, '')}</p>

                        <a 
                            target="_blank" 
                            href={job.redirect_url}>
                            <p>via link</p>
                        </a>
                    </div>
                    
                    <div className={expand ? "job-description" : "job-description hide-job-description" }>
                        {job.description.replace(/<.?strong>/g, '')}
                    </div>
                    
                    <button
                        onClick={toggleDescription}
                        className="card-btn card-btn-expand">
                        <div className={expand ? "seeker-chevron-down-icon rotate" : "seeker-chevron-down-icon"}></div>
                    </button>
            </div>
    )


}

export default Job;