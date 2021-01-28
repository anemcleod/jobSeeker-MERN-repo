import React, {useContext} from 'react';
import {DragDropContext } from "react-beautiful-dnd";

import {AuthContext} from '../../context/AuthContext';
import JobBoard from './jobBoard';
import JobServices from '../../services/jobServices';
import DeleteJob from './deleteJob';



const MyJobBoards = () => {
   const {myJobBoards, setMyJobBoards} = useContext(AuthContext);
    
   
  const addBoard = (e) =>{
    e.preventDefault();
    JobServices.createJobBoard({title: "Job Board"}).then(data => {
        if(data) {
            setMyJobBoards(prevState => {
              let copy = [...prevState]
              copy.push({
                _id: data.id,
                title: "Job Board",
                jobs: []
              });
                return copy;
            });
        }
  });
}
    
    const handleDrop = (e) => {
    
      if(!e.destination){
        return
      }
      if(e.source.index === e.destination.index && e.source.droppableId === e.destination.droppableId){
        return
      }
      
        setMyJobBoards(prevState => {
          let copy = [...prevState];
          let originIndex;
          let destinationIndex;
          let selectedJob;

          for(let i = 0; i < copy.length; i++){
            if(copy[i]._id === e.source.droppableId){
               originIndex = i;
            }
          }
          for(let k = 0; k < copy.length; k++){
            if(copy[k]._id === e.destination.droppableId){
               destinationIndex = k;
            }
          }

          selectedJob = copy[originIndex].jobs.splice(e.source.index,1);
          copy[destinationIndex].jobs.splice(e.destination.index, 0, selectedJob[0]);
          return copy;
        });

        JobServices.moveJob(e.draggableId, e.source.droppableId, e.destination.droppableId, e.destination.index)
        .then(data =>{
          console.log(data);
        })
      
  }

    return (
        <DragDropContext onDragEnd={handleDrop}>
        
            <DeleteJob />

            <div className="board-container minimized">
                    {
                      myJobBoards ? myJobBoards.map((e)=>{
                        return (
                          <JobBoard key={e._id} 
                                    myJobBoard={e}/>
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