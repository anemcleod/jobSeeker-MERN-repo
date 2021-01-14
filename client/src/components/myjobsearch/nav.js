import React, {useState, useEffect} from 'react'


const Nav = ({showSearch, showSearchHandler, showResults, showResultsHandler, showBoards, showBoardsHandler}) => {

    const [mobile, setMobile] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

  

    useEffect(()=>{
     window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
    });

     return (
         () => {
             window.removeEventListener('resize', () => {
                setWidth(window.innerWidth);
            })
            }
        )
    }, []);

    useEffect(()=>{
        if(width >= 800){
            setMobile(false);
        } else {
            setMobile(true)
        }
       }, [width]);

    

    return (
        <div className="myjobsearch-nav-container">
           <button 
                onClick={showResultsHandler}
                className={mobile ? `btn-basic btn-mobile drop-shadow ${showResults ? 'active': ''}` : `btn-basic drop-shadow ${showResults ? 'active': ''}`}>
                {mobile ? <div className="seeker-list-icon"></div> : 'Search Results'}
            </button> 
           <button 
                onClick={showBoardsHandler} 
                className={mobile ? `btn-basic btn-mobile drop-shadow ${showBoards ? 'active': ''}` : `btn-basic drop-shadow ${showBoards ? 'active': ''}`}>
                {mobile ? <div className="seeker-pin-tilt-icon"></div> : 'My Job Boards'}
            </button>
           <button 
                onClick={showSearchHandler} 
                className={mobile ? `btn-basic btn-mobile drop-shadow ${showSearch ? 'active': ''}` : `btn-basic drop-shadow ${showSearch ? 'active': ''}`}>
                {mobile ? <div className="seeker-search-icon"></div> : 'Search'}
            </button>
        </div>
    )
}

export default Nav