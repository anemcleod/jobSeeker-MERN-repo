import React, {useContext} from 'react';
import JobServices from '../../services/jobServices';

import {AuthContext} from '../../context/AuthContext';

const DeleteJob = () => {

    const {deleteJob, setDeleteJob} = useContext(AuthContext);
   
    const exitDeleteJobhandler = (e) => {
        if(e) {
            e.preventDefault();
        }
        setDeleteJob({showDelete: false,
            selectedJob: ""});
    }
    const deleteJobHandler = (e) => {
        e.preventDefault();
        JobServices.deleteJob(deleteJob.selectedJob).then(data => {
            console.log(data);
            exitDeleteJobhandler();
        })
    }



    
    
    return (
        <div className={`delete-job-background ${deleteJob.showDeleteJob ? "delete-job-expand" : ""}`}>
            <div className="delete-job-container">
                <button onClick={exitDeleteJobhandler}
                        className="btn-menu">
                    <div className="seeker-exit-icon"></div>
                </button>
               
               <div className="btn-container">  
                    <button onClick={deleteJobHandler}
                            className="btn-basic btn-danger-active">delete job</button>
                    
                    <button onClick={exitDeleteJobhandler}
                            className="btn-basic">cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteJob;