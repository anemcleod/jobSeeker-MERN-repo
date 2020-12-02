const AuthServices = {
    login : user => {
        console.log(user);
        return fetch('http://localhost:5000/user/login',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401){
                return res.json().then(data => data);
            } else {
                return { isAuthenticated : false, user : {username : ""}};
            }       
        })
    },
    signup : user => {
        return fetch('http://localhost:5000/user/signup', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated : false, user : {username : ""}};
            }    
        })
    },
    logout : () => {
        return fetch('http://localhost:5000/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    //syncs front and back - checks if user is still logged in to server even if react app was closed
    isAuthenticated : () => {
        return fetch('http://localhost:5000/user/authenticated')
                .then(res=>{
                    if(res.status !== 401){
                        return res.json().then(data => data);
                    } else {
                        return { isAuthenticated : false, user : {username : ""}};
                    }
                });
    }

};


export default AuthServices;