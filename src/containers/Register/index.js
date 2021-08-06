import React, {useState, useContext} from 'react';
import './register.scss';
import { MailIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { UserSessionContext } from '../../contexts/UserSession';
import { useHistory } from "react-router-dom";

export default function Register() {
  
  let history = useHistory();
  const { updateUsername } = useContext(UserSessionContext);
  const [isFetching, setIsFetching] = useState(false);
  const [registerResponse, setRegisterResponse] = useState('');

  function isValidUsernameFormat(username) {
    var res = username.match(/^[A-Za-z0-9._]{4,20}$/);
    return (res !== null);
  }

  function isValidEmailFormat(email) {
    var res = email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
    return (res !== null);
  }

  function isValidPasswordFormat(password) {
    // Password should contain at least 1 uppercase letter, 1 number, and be between 8 to 16 characters
    // Alphanumuric only
    var res = password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,17}$/);
    return (res !== null);
  }

  function isSamePassword(password1, password2){
    return (password1 == password2)
  }

  const onSubmit = (event) =>{
    setIsFetching(true);
    event.preventDefault();
    var username = event.target.username.value;
    var email = event.target.email.value;
    var password = event.target.password.value;
    var confirm_password = event.target.confirm_password.value;
    
    console.log(isValidUsernameFormat(username));
    console.log(isValidEmailFormat(email));
    console.log(isValidPasswordFormat(password));
    console.log(isSamePassword(password, confirm_password));
    var reqData = {
      username: username,
      email: email,
      password: password
    }

    console.log(reqData);

    if (isValidUsernameFormat(username) && isValidEmailFormat(email) 
      && isValidPasswordFormat(password) && isSamePassword(password, confirm_password)){
      const response = axios.post(`https://jom123.loca.lt/createUser`, reqData)
      .then((result) => {
        console.log('Account creation successful');
        console.log(result);
        if(result.data.status == 'not-ok'){
          console.log(result.data.message);
          setRegisterResponse(result.data.message);
        } else if (result.data.status == 'success'){
          setRegisterResponse(result.data.message);
          updateUsername(username);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log('Registration unsuccessful');
        setRegisterResponse("Error in creating new account");
        console.log(error);
      }).then(() => {
        setIsFetching(false);
      });
    }
    else {
      setRegisterResponse("Field(s) is incorrect");
      setIsFetching(false);
    }
  }

  return (
    <div>

      <div class="register-div mt-10">

        <div class="register register-session">
          <div class="register-left">
            <svg enable-background="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
              
            </svg>
          </div>

          {isFetching? 
            <div class='register-loader'>
                <Loader
                  type="Bars"
                  color="rgb(182,157,230)"
                  height={250}
                />
            </div>
          :
            <form method="post" onSubmit={onSubmit} class="log-in" autoComplete="off">
              <h4><span>Jom</span> register</h4>
              <p>Save time and ease life by shortening your url!</p>

              <div class="register-floating-label">
                <input placeholder="Username" required="required" type="text" name="username" id="username" autoComplete="off"
                  pattern="[A-Za-z0-9._]{4,20}"
                  title="Username is in alphanumeric between 4 to 20 characters"/>
                <label for="username">Username</label>
                  <div class="icon">
                    <UserIcon />
                  </div>
              </div>

              <div class="register-floating-label">
                <input placeholder="Email" required="required" type="email" name="email" id="email" autoComplete="off"
                  pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}"
                  title="Email must be in a correct format" />
                <label for="email">Email</label>
                <div class="icon">
                  <MailIcon />
                </div>
              </div>

              <div class="register-floating-label">
                <input placeholder="Password" required="required" type="password" name="password" id="password" autoComplete="off"
                  pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,17}"/>
                  <label for="password">Password</label>
                  <div class="icon">
                    <LockClosedIcon/>
                  </div>
              </div>

              <div class="register-floating-label">
                <input placeholder="Confirm password" required="required" type="password" name="confirm_password" id="confirm_password" autoComplete="off"/>
                <label for="password">Confirm password</label>
                <div class="icon">
                  <LockClosedIcon />
                </div>
              </div>

              
              <p style={{ margin: 0, color:'#CA3433'}}>{registerResponse}</p>
              <button type="submit">Register</button>
              

              <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end', width:'100%' }}>
                <a href="/login" class="discrete" target="">Login</a>
                <a href="/Forgot_password" class="discrete" target="">Forgot password</a>
              </div>

            </form>
          }
        </div>
      </div>

    </div>
    
  );
}
