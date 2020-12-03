import React, {useState} from 'react';
import AuthServices from '../services/authServices';
import Message from './message';

const SignupForm = ({newVisitor, setnewVisitor}) => {
    const [user, setUser] = useState({username: '', password: '', checkPassword: '', displayName: ''});
    const [message, setMessage] = useState(null);



    const onChangeHandler = e => {
        setUser({...user, [e.target.name] : e.target.value});
    }
    
    const resetForm = () => {
        setUser({username: '', password: '', checkPassword: '', displayName: ''});
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        AuthServices.signup(user).then(data => {
            const {message} = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                setTimeout(()=> {
                    setnewVisitor(!newVisitor);
                }, 2000);
            }     

        });

    }
    return (
        <div>
            <form onSubmit={onSubmitHandler} className="signup-form">
                
                <input type="text" 
                        name="username" 
                        value={user.username}
                        onChange={onChangeHandler}
                        placeholder="username" 
                        className="input-basic drop-shadow"/>
                
                <input type="text" 
                        name="displayName" 
                        value={user.displayName}
                        onChange={onChangeHandler}
                        placeholder="display name" 
                        className="input-basic drop-shadow"/>
                
                <input type="password" 
                        name="password" 
                        value={user.password}
                        onChange={onChangeHandler}
                        placeholder="password" 
                        className="input-basic drop-shadow"/>
                
                <input type="password" 
                        name="checkPassword" 
                        value={user.checkPassword}
                        onChange={onChangeHandler}
                        placeholder="re-enter password" 
                        className="input-basic drop-shadow"/>

                <button type="submit" className="btn-basic drop-shadow">signup</button>
            </form>  
            {message ? <Message message={message}/> : null}
        </div>
        
    )
}
export default SignupForm;