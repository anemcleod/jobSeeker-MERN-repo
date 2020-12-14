import { Droppable } from 'react-beautiful-dnd';
import Job from './job';

const JobBoard = ({myJobBoard}) => {

    return (
        <Droppable droppableId={myJobBoard._id}>
            {
                (provided) => {
                    return (
                            <div className="job-board-container drop-shadow"
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                <button className="board-menu" ><div className="seeker-elipsis-icon" ></div></button>
                                <h2 className="board-title" >{myJobBoard.title}</h2>
                                {/* <input type="text" name="" id="" placeholder="board title" className="input-basic"/> */}
                                <div className="cards-container">
                                {/* {
                                    myJobBoard.jobs.map((e, i )=> {
                                        return (
                                        <Job key={e._id} job={myJobBoard.jobs[i]} index={i}/>
                                        )
                                    })
                                    } */}
                                {provided.placeholder}
                                </div>   
                            </div>
                    )}

            }

        </Droppable>
    )
}

export default JobBoard;