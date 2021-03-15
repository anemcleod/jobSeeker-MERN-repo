const AuthServices = {
    login : user => {
        return fetch('/api/user/login',{
            credentials: 'include',
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401){
                return res.json().then(data => data);
            } else {
                return { isAuthenticated : false, user : {username : "", displayName :"", initial : ""}, message: {
                    msgBody : "Invalid credentials",
                    msgError : true
                }};
            }       
        })
    },
    signup : user => {
        return fetch('/api/user/signup', {
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated : false, user : {username : "", displayName: "", initial : ""}};
            }    
        })
    },
    logout : () => {
        return fetch('/api/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    //syncs front and back - checks if user is still logged in to server even if react app was closed
    isAuthenticated : () => {
        return fetch('/api/user/authenticated')
                .then(res=>{
                    if(res.status !== 401){
                        return res.json().then(data => data);
                    } else {
                        return { isAuthenticated : false, user : {username : "", displayName : "", initial : ""}};
                    }
                });
    },
    deleteUser : () => {
        return fetch('/api/user/delete', { method : "delete"})
            .then(res => { 
                if(res.status !== 401){
                    return res.json().then(data => data);
                    }else {
                        return {message: {msgBody: 'something went wrong', msgError: true}}
                    }
                })
    }

};


export default AuthServices;