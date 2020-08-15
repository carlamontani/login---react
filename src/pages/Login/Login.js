import React, { useState } from 'react';
import './Login.css';
import Title from './components/Title/Title';
import Label from './components/Label/Label';
import Input from './components/Input/Input';

import img from '../../assets/images/undraw_my_files_swob.svg';

const Login = () => {

    const [ user, setUser ] = useState(''); //usuario
    const [ password , setPassword ] = useState(''); //pass

    const [ passwordError, setPasswordError ] = useState(false); //pass en error

    const [ isLogin, setIsLogin ] = useState(false); // ESTADO USUARIO LOGuEADO

    const [ hasError, setHasError ] = useState(false); //EL SUBMIT TUVO ERROR

    function handleChange(name, value) {
        if(name === 'user'){
            setUser(value)
            setHasError(false);
        } else {
            if(value.length < 6) {
                setPasswordError(true);
                setHasError(false);
            } else {
                setPasswordError(false);
                setPassword(value);
                setHasError(false);
            }            
        }
    };

    console.log(user);
    console.log(password);

    function ifMatch(param) {
        if(param.user.length > 0 && param.password.length > 0) {
            if(param.user === 'carla' && param.password === '123456') {
                const { user, password } = param; //destructuring
                let ac = { user, password }; //lo guarda en un objeto
                console.log(ac)
                let account = JSON.stringify(ac); //pasado a json
                localStorage.setItem('account', account); //en local storage
                setIsLogin(true); //estas logeado
            } else {
                setIsLogin(false); //no estas logeado
                setHasError(true); //tiene error por usuario incorrecto
            }
        } else {
            setIsLogin(false); //no estas logeado
            setHasError(true);  //tiene error por largo de contraseña
        }
    }

    function handleSubmit() {
        let account = { user, password } //objeto! account.user -param.user
        if(account) {
            ifMatch(account);
            console.log('account:', account)
        }
    };

    function newUser(){
        console.log('holacarnueva')
    }

    return (
        <div className='login-container'>

            { isLogin ? 
                <div className='home-container'>
                    <h1>Hi {user}!</h1>
                    <label>Glad to have you back :) </label>
                </div>
                :
                <div className= 'login-content'>

                    <div className='login-square'>

                        <Title text='Welcome Back!' />

                        { hasError && 
                            <label className= 'label-alert'> 
                                Invalid user or password
                            </label>
                        }

                        <Label text=''/>

                        <Input
                        attribute= {{
                            id: 'user',
                            name: 'user',
                            type: 'text',
                            placeholder: 'User Name',
                        }}
                        handleChange={handleChange}
                        />

                        <Label text=''/>

                        <Input
                        attribute= {{
                            id: 'contraseña',
                            name: 'contraseña',
                            type: 'password',
                            placeholder: 'Password',
                        }}
                        handleChange = {handleChange}
                        param = {passwordError} //esta en error-falso
                        />   

                        { passwordError &&            
                            <label className= 'label-error'>
                                More than 6 letters or digits
                            </label>
                        }

                        <div className='submit-button-container'>
                            <button onClick = { handleSubmit } className='submit-button'>
                                ingresar
                            </button>  
                        </div>       

                        <div className='newuser-button-container'>
                            <p>Don´t have an account?
                                <a href="#" onClick = { newUser }  >Sign Up</a>
                            </p>                            
                        </div>   

                    </div>
                </div>
            }

            <div className="login-illustration">
                <div className="container-illustration"> 
                    <img src={img} alt="user login" className="illustration"/> 
                </div> 
            </div>

        </div>
    )
}


export default Login;