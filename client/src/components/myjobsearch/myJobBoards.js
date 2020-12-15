import React, {useContext, useState} from 'react';
import {DragDropContext } from "react-beautiful-dnd";

import JobBoard from './jobBoard';


const MyJobBoards = () => {

    const handleDrop = () => {
        console.log("item dropped");
    }

    return (
        <DragDropContext onDragEnd={handleDrop}>

            <div className="board-container minimized">
                    {
                      myJobBoards ? myJobBoards.map((e)=>{
                        return(
                          <JobBoard key={e._id} myJobBoard={e}/>
                        )
                      }) : "loading"
                    }
            </div>

         </DragDropContext>
    
    )
}

export default MyJobBoards;