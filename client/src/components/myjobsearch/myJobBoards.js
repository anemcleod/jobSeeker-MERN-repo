import React, {useContext, useState, useEffect} from 'react';
import {DragDropContext } from "react-beautiful-dnd";

import {AuthContext} from '../../context/AuthContext';
import JobBoard from './jobBoard';
import JobServices from '../../services/jobServices';
import DeleteJob from './deleteJob';


const MyJobBoards = () => {
    
   const [myJobBoards, setMyJobBoards] = useState(null);
   const [updateBoard, setUpdateBoard] = useState(false);
   const [deleteJob, setDeleteJob] = useState({
                                                showDeleteJob: false,
                                                selectedJob: ""
                                              })   
   const {setIsLoaded} = useContext(AuthContext);

   const addBoard = (e) =>{
    e.preventDefault();
    JobServices.createJobBoard({title: "Job Board"}).then(data => {
        if(data) {
            console.log(data);
        } 
        setUpdateBoard(!updateBoard);
    });
}
    
   useEffect(()=>{
    setIsLoaded({loading : true, loaded: false, message: 'loading boards'})
    JobServices.populate().then(data => {
      setIsLoaded({loading : false, loaded:true, message: ''});
      if(data){
        setMyJobBoards(data.jobBoards)
        console.log(data.jobBoards)
      }
    });
  }, [setIsLoaded, updateBoard]);

    const handleDrop = (e) => {
      if(!e.destination){
        return
      }
      if(e.source.index === e.destination.index && e.source.droppableId === e.destination.droppableId){
        return
      }

      JobServices.moveJob(e.draggableId, e.source.droppableId, e.destination.droppableId)
      .then(data =>{
        console.log(data);
        setUpdateBoard(!updateBoard);
      } )
    }

    return (
        <DragDropContext onDragEnd={handleDrop}>
            
            <DeleteJob deleteJob={deleteJob}
                       setDeleteJob={setDeleteJob}/>

            <div className="board-container minimized">
                    {
                      myJobBoards ? myJobBoards.map((e)=>{
                        return(
                          <JobBoard key={e._id} myJobBoard={e} updateBoard={updateBoard} 
                          setUpdateBoard={setUpdateBoard} deleteJob={deleteJob}
                          setDeleteJob={setDeleteJob}/>
                        )
                      }) : null
                    }
                    <div className="btn-add-board-container">
                      <button 
                      onClick={addBoard} 
                      className="btn-add-board">
                          <div className="seeker-exit-icon icon-rotate"></div>
                      </button>
                    </div>
                     
            </div>

         </DragDropContext>
    
    )
}

export default MyJobBoards;