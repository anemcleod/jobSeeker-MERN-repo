import React, {useState} from 'react';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

const Home = () => {
    const [newVisitor, setnewVisitor] = useState(false);
    const text = !newVisitor ? "signup" : "login";
    const formToggler = (e) => {
        e.preventDefault();
        setnewVisitor(!newVisitor);
    }
    return (
        <div className="login-container">
            <button className="btn-basic drop-shadow btn-login-toggle"
                    onClick={formToggler}
            >
                {text}
            </button>
            <div className="form-container">
                <img className="login-logo"src="/jobseeker.png" alt="jobseeker logo"/>
                {
                    !newVisitor ?<LoginForm />:<SignupForm newVisitor={newVisitor} setnewVisitor={setnewVisitor}/>
                }
            </div> 
        </div>
    )

}

export default Home;