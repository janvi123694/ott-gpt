
export const checkValidateData = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{4,20}$/

    const isEmailValid = (emailRegex.test(email))
    const isPasswordValid = passwordRegex.test(password);

    if(!isEmailValid){
        return "email is not valid"; 
    }
    else if(!isPasswordValid){
        return "password is not valid"; 
    }
    else{
        return null; 
    }
}
