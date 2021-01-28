import React, {useContext} from 'react';
import JobServices from '../../services/jobServices';

import {AuthContext} from '../../context/AuthContext';

const PinJobMenu = () => {

    const {myJobBoards, setMyJobBoards, pinJob, setPinJob} = useContext(AuthContext)
    
    const exitPinMenuHandler = (e) => {
        if(e){
            e.preventDefault();
        }
        setPinJob({
            showPinJob: false,
            selectedJob: null
        });
    }

    const pinToBoardHandler = (id, i) => {
        let jobCopy = {...pinJob.selectedJob};
        jobCopy.jobBoardId = id;

        JobServices.createJob(jobCopy).then(data => {
            if(data){
                console.log(data);
                setMyJobBoards( prevState=> {
                    let copy = [...prevState];
                    jobCopy._id = data.id;
                    copy[i].jobs.push(jobCopy);
                    return copy;
                })
                exitPinMenuHandler();
            }
        }) 
    
      
    }

    return (
        <div className={`pin-job-background ${pinJob.showPinJob ? "pin-job-expand" : ""}`}>
            <div className="pin-job-container">
                <button onClick={exitPinMenuHandler}
                        className="btn-menu">
                    <div className="seeker-exit-icon"></div>
                </button>
               
               <div className="btn-container">  
               <h2 className="board-title pin-board-title" >select board</h2>  
                    {
                        myJobBoards.map((board, i) => {
                            return (
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    pinToBoardHandler(board._id, i);
                                }}
                                        className="btn-basic btn-pin-menu"
                                        key={board._id}>
                                            {board.title}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PinJobMenu;