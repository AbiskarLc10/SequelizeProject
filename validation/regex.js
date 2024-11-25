
const validateEmail= (email) =>{

    if(email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        return true
    }else{
        return false
    }
}


module.exports = {
    validateEmail
}
