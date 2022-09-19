import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    //Get api key from Firebase project(Project Overview > Project Settting > Web API key)
    //SIGN-UP : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    //SIGN-IN : https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    let url; 
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq48PV-b30TZOL2po5JRlVkhooJSINkRw';
    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq48PV-b30TZOL2po5JRlVkhooJSINkRw';
    }
    fetch(
      url,
      {
        //After successful post requst check user deatails
        //https://console.firebase.google.com/project/react-auth-proj-6b151/authentication/users
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      setIsLoading(false);
      if(res.ok) {
        //Check response data in api. Refer above firebase url.
        return res.json();
      }
      else {
        res.json().then(data => {
          //console.log(data);
          let errorMessage = 'Authentication failed'; 
          //if(data && data.error && data.error.errorMessage) {
          //  errorMessage = data.error.errorMessage;
          //}
          throw new Error(errorMessage);
        });
      }
    })
    .then(data => {
      authCtx.login(data.idToken);
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
