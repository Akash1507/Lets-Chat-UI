import axios from 'axios';
import * as actions from './actionTypes';


export const authStart = () =>{
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = (username,token) =>{
    return {
        type: actions.authSuccess,
        token:token,
        username : username
    }
}

export const authFail = error =>{
    return {
        type: actions.AUTH_FAIL,
        error:error
    }
}

export const authLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    return {
        type: actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(authLogout())
        },expirationTime*1000)
    }
}

export const authLogin = (username,password) =>{
    return dispatch => {dispatch(authStart());
    axios.post("127.0.0.1:8000/rest-auth/login/",{
        username :username,
        password:password
    }).then(res =>{
        const token = res.data.key;
        localStorage.setItem('token',token);
        localStorage.setItem('username',username);
        expirationDate = new Date(new Date().getTime() + 1000*3600);
        localStorage.setItem('expirationDate',expirationDate);
        dispatch(authSuccess(username,token));
        dispatch(checkAuthTimeout(3600));
    }).error(err =>{
        dispatch(authFailL(error))
    })}
}

export const authSignup = (username,email,password1,password2) =>{
    return dispatch => {dispatch(authStart());
    axios.post("127.0.0.1:8000/rest-auth/registration/",{
        username :username,
        email:email,
        password1:password1,
        passsword2:password2
    }).then(res =>{
        const token = res.data.key;
        localStorage.setItem('token',token);
        localStorage.setItem('username',username);
        expirationDate = new Date(new Date().getTime() + 1000*3600);
        localStorage.setItem('expirationDate',expirationDate);
        dispatch(authSuccess(username,token));
        dispatch(checkAuthTimeout(3600));
    }).error(err =>{
        dispatch(authFailL(error))
    })}
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token===undefined){
            dispatch(authLogout())
        }else{
            const expirationDate = localStorage.getItem(expirationDate);
            if (expirationDate <= new Date()){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(username,token));
                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime())/1000
                ))
            }
        }
    }
}