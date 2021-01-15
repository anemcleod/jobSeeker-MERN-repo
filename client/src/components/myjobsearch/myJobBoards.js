import React, {useContext, useState, useEffect} from 'react';
import {DragDropContext } from "react-beautiful-dnd";

import {AuthContext} from '../../context/AuthContext';
import JobBoard from './jobBoard';
import JobServices from '../../services/jobServices';


const MyJobBoards = () => {
    
   const [myJobBoards, setMyJobBoards] = useState(null);
   const [updateBoard, setUpdateBoard] = useState(false);
   
   const {setIsLoaded} = useContext(AuthContext);
    
   useEffect(()=>{
    setIsLoaded({loading : true, loaded: false, message: 'loading boards'})
    JobServices.populate().then(data => {
      setIsLoaded({loading : false, loaded:true, message: ''});
      if(data){
        setMyJobBoards(data.jobBoards)
      }
    });
  }, [setIsLoaded, updateBoard]);

    const handleDrop = () => {
        console.log("item dropped");
    }

    return (
        <DragDropContext onDragEnd={handleDrop}>

            <div className="board-container minimized">
                    {
                      myJobBoards ? myJobBoards.map((e)=>{
                        return(
                          <JobBoard key={e._id} myJobBoard={e} updateBoard={updateBoard} 
                          setUpdateBoard={setUpdateBoard}/>
                        )
                      }) : null
                    }
            </div>

         </DragDropContext>
    
    )
}

export default MyJobBoards;