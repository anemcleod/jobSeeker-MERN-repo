import React, {useContext, useState, useEffect} from 'react';
import {DragDropContext, Droppable } from "react-beautiful-dnd";
import CustomScroller from 'react-custom-scroller';

import JobServices from '../services/jobServices';
import {AuthContext} from '../context/AuthContext';

import Job from './job';
import SearchForm from './searchForm';
import JobBoard from './jobBoard';

const MyJobSearch = () => {
    const [myJobBoards, setMyJobBoards] = useState(null);
    const {searchResults} = useContext(AuthContext);
    

    useEffect(()=>{
      JobServices.populate().then(data => {
        if(data){
          setMyJobBoards(data.jobBoards)
        }
      });
    }, []);

  

    const handleDrop = () => {
        console.log("item dropped");
    }


    return (
            <div className="myjobsearch-container">
                <SearchForm />
            <DragDropContext onDragEnd={handleDrop}>
                <CustomScroller className="customScroller">
                <Droppable droppableId="resultsColumn">
              { (provided) => {
                return (
                 
                    <div className="results-container"
                          ref={provided.innerRef}
                          {...provided.droppableProps}>
                    {
                     searchResults ? searchResults.map((e, i )=> {
                        return (
                          <Job key={e.id} job={e} index={i}/>
                        )
                      }): null
                    }
                    {provided.placeholder}
                    </div>
                    
              )}}
            </Droppable>
            </CustomScroller>
            <CustomScroller className="customScroller">
                <div className="board-container">
                  {
                    myJobBoards ? myJobBoards.map((e)=>{
                      return(
                        <JobBoard key={e._id} myJobBoard={e}/>
                      )
                    }) : "loading"
                  }
                </div>
            </CustomScroller>
            </DragDropContext>
            </div>
        
    )
}

export default MyJobSearch;