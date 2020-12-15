import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';



const Loading = () => {
    const {isLoaded} = useContext(AuthContext);
return (
    <div className="loading-container">
        {isLoaded.message ? <h1 className="loading-message">{isLoaded.message}</h1> : null}
        <div className="seeker-spinner-icon rotate-anim"></div>
    </div>
)
}

export default Loading;