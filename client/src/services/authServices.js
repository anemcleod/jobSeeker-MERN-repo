const AuthServices = {
    login : user => {
        return fetch('/user/login',{
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
                return { isAuthenticated : false, user : {username : "", displayName :"", initial : ""}};
            }       
        })
    },
    signup : user => {
        return fetch('/user/signup', {
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
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    //syncs front and back - checks if user is still logged in to server even if react app was closed
    isAuthenticated : () => {
        return fetch('/user/authenticated')
                .then(res=>{
                    if(res.status !== 401){
                        return res.json().then(data => data);
                    } else {
                        return { isAuthenticated : false, user : {username : "", displayName : "", initial : ""}};
                    }
                });
    }

};


export default AuthServices;