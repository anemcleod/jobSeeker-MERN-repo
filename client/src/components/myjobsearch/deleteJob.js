import React, {useContext} from 'react';
import JobServices from '../../services/jobServices';

import {AuthContext} from '../../context/AuthContext';

const DeleteJob = () => {

    const {setMyJobBoards, deleteJob, setDeleteJob} = useContext(AuthContext);
   
    //close delete job menu and cancel
    const exitDeleteJobhandler = (e) => {
        if(e) {
            e.preventDefault();
        }
        setDeleteJob({showDelete: false,
            selectedJob: "",
            boardId: ""});
    }

    const deleteJobHandler = (e) => {
        e.preventDefault();

        //remove from database
        JobServices.deleteJob(deleteJob.selectedJob).then(data => {
            if(data){
               console.log(data);
            };
        })

        //remove from state
        setMyJobBoards(prevState => {
            let copy =[...prevState];
            let indexOfBoard;
            let indexOfJob;
            
            for(let i = 0; i < copy.length; i++){
                if(copy[i]._id === deleteJob.boardId){
                    indexOfBoard = i;

                    for(let k = 0; k < copy[indexOfBoard].jobs.length; k++){
                        if(copy[indexOfBoard].jobs[k]._id === deleteJob.selectedJob){
                            indexOfJob = k;
                        }
                    }
                }
            }
            copy[indexOfBoard].jobs.splice(indexOfJob, 1);
            return copy;
        });

        setDeleteJob(prevState => {
            prevState.showDelete = false;
            return prevState;     
        });

        exitDeleteJobhandler();
    }

    return (
        <div className={`delete-job-background ${deleteJob.showDeleteJob ? "delete-job-expand" : ""}`}>
            <div className="delete-job-container">
                <button 
                    onClick={exitDeleteJobhandler}
                    className="btn-menu">
                    <div className="seeker-exit-icon"></div>
                </button>
               
               <div className="btn-container">  
                    <button 
                        onClick={deleteJobHandler}
                        className="btn-basic btn-danger-active">
                        delete job
                        </button>
                    
                    <button 
                        onClick={exitDeleteJobhandler}
                        className="btn-basic">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteJob;