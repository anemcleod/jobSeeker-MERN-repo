const SearchServices = {
    search : (searchParams) => {
        return fetch('/search', {
            method: 'post',
            body : JSON.stringify(searchParams),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401){
                return res.json().then(data => data);
            } else {
               return {message: {
                    msgBody : "Something went wrong",
                    msgError : true
                }};}
        })
    }
}

export default SearchServices;