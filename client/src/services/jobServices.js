const JobServices = {
    populate : () => {
        return fetch('/api/user/jobs').then(res => {
            if(res.status !== 401){
                return res.json().then(data => data);
            }else {
                return {message: {msgBody: 'something went wrong', msgError: true}}
            }
        })
    },

    createJob : (job) => {
        return fetch('/api/user/jobs', {
            method: 'post',
            body : JSON.stringify(job),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return {message: {msgBody: 'something went wrong', msgError: true}}
            }
            
        })
    },

    createJobBoard : (jobBoard) => {
        return fetch('/api/user/jobBoard', {
            method: 'post',
            body : JSON.stringify(jobBoard),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return {message: {msgBody: 'something went wrong', msgError: true}}
            }
            
        })
    },

    updateBoardTitle : (jobBoardId, boardTitle) => {
        return fetch(`/api/user/jobBoard/${jobBoardId}`, 
         {  method: 'put',
            body : JSON.stringify(boardTitle),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => { 
            if(res.status !== 401){
                return res.json().then(data => data);
                } else {
                    return {message: {msgBody: 'something went wrong', msgError: true}}
                }
            })

    },

    moveJob : (jobId, oldJobBoardId, newJobBoardId, index) => {
        return fetch(`/api/user/jobs/${jobId}`,
        {  method: 'put',
            body : JSON.stringify({"oldJobBoardId":oldJobBoardId,
                                    "newJobBoardId": newJobBoardId,
                                    "destinationIndex" : index}),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401){
                return res.json().then(data => data);
                } else {
                    return {message: {msgBody: 'something went wrong', msgError: true}}
                }
        })
    },

    deleteJob : (jobId) => {
        return fetch(`/api/user/jobs/${jobId}`, { method: 'delete'})
        .then(res => { 
            if(res.status !== 401){
                return res.json().then(data => data);
                } else {
                    return {message: {msgBody: 'something went wrong', msgError: true}}
                }
            })
    },
    
    deleteJobBoard : (jobBoardId) => {
        return fetch(`/api/user/jobBoard/${jobBoardId}`, { method: 'delete'})
        .then(res => { 
            if(res.status !== 401){
                return res.json().then(data => data);
                } else {
                    return {message: {msgBody: 'something went wrong', msgError: true}}
                }
            })
    }

}

export default JobServices;