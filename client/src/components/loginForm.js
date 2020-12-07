import React, {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AuthServices from '../services/authServices';
import Message from './message';

const LoginForm = () => {
    const [user, setUser] = useState({username: '', password: ''});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);


    const onChangeHandler = e => {
        setUser({...user, [e.target.name] : e.target.value});
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        AuthServices.login(user).then(data => {
            console.log(data);
            const {user, isAuthenticated, message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }else {
                console.log(message)
                setMessage(message);
            }
        });

    }
    return (
        <div>
            <form onSubmit={onSubmitHandler} className="login-form">
                
                <input type="text" 
                        name="username" 
                        onChange={onChangeHandler}
                        placeholder="username" 
                        className="input-basic drop-shadow"/>
                
                <input type="password" 
                        name="password" 
                        onChange={onChangeHandler}
                        placeholder="password" 
                        className="input-basic drop-shadow"/>

                <button type="submit" className="btn-basic drop-shadow">login</button>
            </form>  
            {message ? <Message message={message}/> : null}
        </div>
        
    )
}
export default LoginForm;