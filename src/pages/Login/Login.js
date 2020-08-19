import React, { useState } from 'react';
import './Login.css';
import Title from './components/Title/Title';
import Label from './components/Label/Label';
import Input from './components/Input/Input';
import Icons from './components/Icons/Icons';

import img from '../../assets/images/undraw_my_files_swob.svg';

const Login = () => {

    const [ user, setUser ] = useState(''); //usuario
    const [ password , setPassword ] = useState(''); //pass

    const [ email , setEmail ] = useState(''); //pass -- NEWUSER
    const [ name , setName ] = useState(''); //pass -- NEWUSER
    const [ surname , setSurname ] = useState(''); //pass -- NEWUSER
    const [ password_nu , setPassworNU ] = useState(''); //pass -- NEWUSER
    const [ password_nu_conf , setConfPassworNU ] = useState(''); //pass -- NEWUSER


    const [ passwordError, setPasswordError ] = useState(false); //pass en error -- LOGIN

    const [ isLogin, setIsLogin ] = useState(false); // ESTADO USUARIO LOGuEADO -- LOGIN

    const [ hasError, setHasError ] = useState(false); //EL SUBMIT TUVO ERROR -- LOGIN

    const [ nUser, setNewUser ] = useState(false); // newuser -- NEWUSER

    const [ nUserMailError, setnUserMailError ] = useState(false); // newuser -- NEWUSER

    const [ nUserCreated, setnUserCreated ] = useState(false); // newuser -- NEWUSER

    const [ nUserError, setnUserError ] = useState(false); // newuser -- NEWUSER

    const [ nUserPassError, setnUserPassError ] = useState(false); // newuser -- NEWUSER




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


    ///NEW USER


    function handleChangeNU(name, value) {
        if (name=== 'user'){
            setUser(value)
            setHasError(false);

        } else if (name=== 'name') {
            setName(value);
            setHasError(false);
            console.log(value);

        } else if (name === 'surname'){
            setSurname(value);
            setHasError(false);
            console.log(value);

        } else if (name === 'email'){
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                console.log('tu mail es ' + value);
                setHasError(false);
                setnUserMailError(false);
                setEmail(value);
            } else if (value.length < 1){
                setnUserMailError(false);
            } else {
                console.log ('todo sigue igual de mal')
                setnUserMailError(true);
            }

        } else if (name === 'password_nu'){
            if(value.length > 6) {
                setPasswordError(false);
                setPassworNU(value);
                setHasError(false);
            } else if (value.length < 1){
                setHasError(false);
                setPasswordError(false);
            } else {
                setPasswordError(true);
                setHasError(false);
            }        

        } else if (name === 'password_nu_conf'){
            if( value == password_nu) {
                console.log ('eeepensaste bien')
                setnUserPassError(false);
                setConfPassworNU(value);
                setPasswordError(false);
                
            } else if(value.length < 1){
                setnUserPassError(false);
                setPasswordError(false);    
            } else {
                console.log ('las pass no son iguales pp')
                setnUserPassError(true);
                setPasswordError(false);                
            }
        } 
    };


    function ifMatchNU(param) {
        console.log(param);
        if(param.user.length > 0 && param.password_nu.length > 0 ) {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(param.email)) { //verifico email correcto
                if( param.password_nu === param.password_nu_conf) {
                    const { user, password_nu, email  } = param; //destructuring
                    let ac = { user, password_nu, email }; //lo guarda en un objeto
                    console.log(ac)
                    let account = JSON.stringify(ac); //pasado a json
                    localStorage.setItem('account', account); //en local storage
                    setnUserCreated(true); //usuario creado
                } else {
                    console.log('contraseña no coincide')
                }
            } else {
                console.log('MAIL INCORRECTO')
                setnUserCreated(false); //no usuario creado
                setnUserMailError(true); //tiene error por email incorrecto 
            }
        } else {
            setnUserCreated(false); //no usuario creado
            setHasError(true);  //tiene error por largo de contraseña
            console.log('salio todo re mal')
            console.log('account:', param) 
        }
    }

    function handleSubmitNew() {
        let account = { user, email, password_nu, password_nu_conf } //objeto! account.user -param.user
        console.log('account:', account) 
        if(account) {
            ifMatchNU(account);
            console.log('account:', account) //!!!!!!!!!!!!!!!!
        }
    };

    function newUser(){
        console.log('holacarnueva');
        setNewUser(true);
        setHasError(false);
    }

    return (
        <div className='login-container'>

            {
                nUser ? 
                
                    <div className= 'login-content'>

                        <div className='login-square'>

                            <Title text='New User' />

                            <Label text=''/>

                            <Input
                            attribute= {{
                                id: 'user',
                                name: 'user',
                                type: 'text',
                                placeholder: 'User',
                            }}
                            handleChange={handleChangeNU}
                            />

                            <Label text=''/>

                            <Input
                            attribute= {{
                                id: 'name',
                                name: 'name',
                                type: 'text',
                                placeholder: 'First Name',
                            }}
                            handleChange={handleChangeNU}
                            />

                            <Label text=''/>

                            <Input
                            attribute= {{
                                id: 'surname',
                                name: 'surname',
                                type: 'text',
                                placeholder: 'Last Name',
                            }}
                            handleChange={handleChangeNU}
                            />

                            <Label text=''/>

                            <Input
                            attribute= {{
                                id: 'email',
                                name: 'email',
                                type: 'text',
                                placeholder: 'Email',
                            }}
                            handleChange={handleChangeNU}
                            />

                            <Label text=''/>

                            <Input
                            attribute= {{
                                id: 'password',
                                name: 'password_nu',
                                type: 'password',
                                placeholder: 'Password',
                            }}
                            handleChange = {handleChangeNU}
                            param = {passwordError} //esta en error-falso
                            />   

                            <Label text=''/>

                            <Input
                            attribute= {{
                                id: 'password_conf',
                                name: 'password_nu_conf',
                                type: 'password',
                                placeholder: 'Confirm Password',
                            }}
                            handleChange = {handleChangeNU}
                            param = {passwordError} //esta en error-falso
                            /> 

                            <div className='error-message'>
                                { passwordError &&            
                                    <label className= 'label-error'>
                                        <p className='p-message'>
                                            More than 6 characters long
                                        </p>
                                    </label>
                                }
                                { nUserError && 
                                    <label className= 'label-alert'> 
                                        <p className='p-message'>
                                            That usernanoooct
                                        </p>
                                    </label>
                                }
                                { hasError && 
                                    <label className= 'label-alert'> 
                                        <p className='p-message'>
                                            That usernanoooct
                                        </p>
                                    </label>
                                }
                                { nUserPassError && 
                                    <label className= 'label-alert'> 
                                        <p className='p-message'>
                                            The password you provided doesn't match
                                        </p>
                                    </label>
                                } 
                                { nUserMailError && 
                                    <label className= 'label-alert'> 
                                        <p className='p-message'>
                                            Not a valid email address
                                        </p>
                                    </label>
                                }
                            </div>

                            <div className='submit-button-container'>
                                <button onClick = { handleSubmitNew } className='submit-button'>
                                    Create New User
                                </button>  
                            </div>   

                            <div className='newuser-button-container'>
                                <p>Already have an account?
                                    <a href="#" onClick = { newUser }  >Log in here.</a>
                                </p>                            
                            </div> 
                        </div>
                    </div>
                    
                    :

                    <div className= 'login-content'>
                        { isLogin ? 
                            <div className='home-container'>
                                <h1>Hi {user}!</h1>
                                <label>Glad to have you back :) </label>
                            </div>
                            :
                            <div className= 'login-content'>

                                <div className='login-square'>

                                    <Title text='Welcome Back!' />


                                    <Label text=''/>

                                    <Input
                                    attribute= {{
                                        id: 'user',
                                        name: 'user',
                                        type: 'text',
                                        placeholder: 'User',
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

                                    <div className='error-message'>
                                        { passwordError &&            
                                            <label className= 'label-error'>
                                                <p className='p-message'>
                                                    More than 6 letters or digits
                                                </p>
                                            </label>
                                        }
                                        { hasError && 
                                        <label className= 'label-alert'> 
                                            <p className='p-message'>
                                                That username or password is incorrect
                                            </p>
                                        </label>
                                        }
                                    </div>

                                    <div className='or'>
                                        <p>-or-</p>  
                                    </div>
                                    
                                    <Icons/>

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