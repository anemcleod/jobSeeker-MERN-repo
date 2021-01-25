import {useState} from 'react';
import { Droppable } from 'react-beautiful-dnd';

import {AuthContext} from '../../context/AuthContext';

import Menu from './boardMenu';
import PinnedJob from './pinnedJob';

const JobBoard = ({myJobBoard}) => {

    

    const [menu, setMenu] = useState(false);
    const [showDeleteBoard, setShowDeleteBoard] = useState(false);
    const [boardTitle, setBoardTitle] = useState({title: myJobBoard.title});
    
    const menuToggler = () => {
        if(showDeleteBoard) {
            setShowDeleteBoard(false);
        }
        setMenu(!menu);
    }


    return (
        <Droppable droppableId={myJobBoard._id}>
            {
                (provided) => {
                    return (
                            <div className="job-board-container drop-shadow"
                                ref={provided.innerRef}
                                {...provided.droppableProps}>

                                <Menu menuToggler={menuToggler} 
                                      menu={menu} 
                                      showDeleteBoard={showDeleteBoard} 
                                      setShowDeleteBoard={setShowDeleteBoard}
                                      boardTitle={boardTitle} 
                                      setBoardTitle={setBoardTitle}
                                      boardId={myJobBoard._id}
                                      />
                                <button
                                    onClick={menuToggler} 
                                    className="board-menu" >
                                        <div className="seeker-elipsis-icon" ></div>
                                </button>

                                <h2 className="board-title" >{boardTitle.title}</h2>
                             
                                <div className="cards-container">
                                {
                                    myJobBoard.jobs.map((e, i )=> {
                                        return (
                                        <PinnedJob key={e._id} job={myJobBoard.jobs[i]} index={i}
    
                                        />
                                        )
                                    })
                                    }
                                {provided.placeholder}
                                </div>   
                            </div>
                    )}

            }

        </Droppable>
    )
}

export default JobBoard;