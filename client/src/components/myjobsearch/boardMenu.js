import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import JobServices from '../../services/jobServices';

const Menu = ({index, menuToggler, menu, showDeleteBoard, setShowDeleteBoard, boardTitle, setBoardTitle, boardId}) => {
    
    const {setMyJobBoards} = useContext(AuthContext);
    
    //show delete board button
    const revealDelete = (e) => {
        e.preventDefault();
        setShowDeleteBoard(!showDeleteBoard);
    }

    const deleteBoard = (e) => {
        e.preventDefault();
        
        //remove from state
        setMyJobBoards(prevState => {
            return  prevState.filter(board => board._id !== boardId);
        });

        //remove from database
        JobServices.deleteJobBoard(boardId).then(data => {
            if(data.message.msgError){
                alert(data.message.msgBody);
            }
        });
    }

    const onChangeHandler = e => {
        setBoardTitle({title: e.target.value});
    }
    
    const saveChangesHandler = (e) => {
        e.preventDefault();

        //close board menu
        menuToggler();

        //update title in state
        setMyJobBoards(prevState => {
            prevState[index].title = boardTitle.title;
            return prevState     
        });

        //update title in database
        JobServices.updateBoardTitle( boardId, boardTitle).then(data => {
            if(data.message.msgError){
                alert(data.message.msgBody);
            }
        });
    }
    

        
    return (
        <div className={menu ? "board-menu-container board-menu-container-expand" : "board-menu-container"}>
            <button 
                onClick={menuToggler} 
                className="btn-menu">
                <div className="seeker-exit-icon "></div>
            </button>

            <form>
                <input 
                    type="text"
                    className="input-basic "
                    placeholder="new title"
                    onChange={onChangeHandler}/>

                <button 
                    onClick={saveChangesHandler} 
                    type="submit" 
                    className="btn-basic btn-menu-options btn-board">
                    save changes
                </button>

                <button 
                    onClick={revealDelete} 
                    className={showDeleteBoard ? "btn-basic btn-menu-options btn-board btn-danger-active" : "btn-basic btn-menu-options btn-board"}>
                    {showDeleteBoard ? "cancel" : "delete board"}
                </button>

                { 
                    showDeleteBoard ? (
                        <button 
                            onClick={deleteBoard} 
                            className="btn-basic btn-menu-options btn-danger-active">
                            I'm sure
                        </button>) : null
                }
            </form>
        </div>
    )
}

export default Menu;