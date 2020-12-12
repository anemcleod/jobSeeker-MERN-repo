import React, {useContext} from 'react';
import SearchForm from './searchForm';
import {DragDropContext, Droppable } from "react-beautiful-dnd";
import {AuthContext} from '../context/AuthContext';
import Job from './job';
import CustomScroller from 'react-custom-scroller';


const MyJobSearch = () => {
    const {searchResults} = useContext(AuthContext);

    const handleDrop = () => {
        console.log("item dropped");
    }


    return (
        <DragDropContext onDragEnd={handleDrop}>
            <div className="myjobsearch-container">
                <SearchForm />
            
                <Droppable droppableId="resultsColumn">
              { (provided) => {
                return (
                  <CustomScroller className="customScroller">
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
                    </CustomScroller>
              )}}
            </Droppable>

                <div className="board-container">boards here</div>
            </div>
        </DragDropContext>
    )
}

export default MyJobSearch;