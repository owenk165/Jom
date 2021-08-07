import React, {useState, useContext} from 'react';
import './forgot.scss';
import { MailIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { UserSessionContext } from '../../contexts/UserSession';
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
  
  let history = useHistory();
  const { updateUsername } = useContext(UserSessionContext);
  const [isFetching, setIsFetching] = useState(false);
  const [updateResponse, setUpdateResponse] = useState('');

  let config = {
    headers: {
      "Bypass-Tunnel-Reminder": "-",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
  }

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
      const response = axios.put(`https://jom123.loca.lt/changePassword`, reqData, config)
      .then((result) => {
        console.log('Password changed successful');
        console.log(result);
        if(result.data.status == 'not-ok'){
          console.log(result.data.message);
          setUpdateResponse(result.data.message);
        } else if (result.data.status == 'ok'){
          setUpdateResponse(result.data.message);
          updateUsername(username);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log('Password change unsuccessful');
        setUpdateResponse("Error in changing password");
        console.log(error);
      }).then(() => {
        setIsFetching(false);
      });
    }
    else {
      setUpdateResponse("Field(s) is incorrect");
      setIsFetching(false);
    }
  }

  return (
    <div>

      <div class="forgot-div mt-10">

        <div class="forgot forgot-session">
          <div class="forgot-left">
            <svg enable-background="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
              
            </svg>
          </div>

          {isFetching? 
            <div class='forgot-loader'>
                <Loader
                  type="Bars"
                  color="rgb(182,157,230)"
                  height={250}
                />
            </div>
          :
            <form method="post" onSubmit={onSubmit} class="log-in" autoComplete="off">
              <h4><span>Jom</span> remember</h4>
              <p>Fret none! Renew your password with your username and email!</p>

              <div class="forgot-floating-label">
                <input placeholder="Username" required="required" type="text" name="username" id="username" autoComplete="off"
                  pattern="[A-Za-z0-9._]{4,20}"
                  title="Username must be in alphanumeric between 4 to 20 characters"/>
                <label for="username">Username</label>
                  <div class="icon">
                    <UserIcon />
                  </div>
              </div>

              <div class="forgot-floating-label">
                <input placeholder="Email" required="required" type="email" name="email" id="email" autoComplete="off"
                  pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}"
                  title="Email must be in a correct format" />
                <label for="email">Email</label>
                <div class="icon">
                  <MailIcon />
                </div>
              </div>

              <div class="forgot-floating-label">
                <input placeholder="Password" required="required" type="password" name="password" id="password" autoComplete="off"
                  pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,17}"
                  title="Password must contain at least 1 uppercase letter, 1 number, and be between 8 to 16 characters"/>
                  <label for="password">New password</label>
                  <div class="icon">
                    <LockClosedIcon/>
                  </div>
              </div>

              <div class="forgot-floating-label">
                <input placeholder="Confirm password" required="required" type="password" name="confirm_password" id="confirm_password" autoComplete="off"/>
                <label for="password">Confirm password</label>
                <div class="icon">
                  <LockClosedIcon />
                </div>
              </div>

              
              <p style={{ margin: 0, color:'#CA3433'}}>{updateResponse}</p>
              <button type="submit">Change password</button>
              

              <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end', width:'100%' }}>
                <a href="/Jom/Login" class="discrete" target="">Login</a>
                <a href="/Jom/Register" class="discrete" target="">Register</a>
              </div>

            </form>
          }
        </div>
      </div>

    </div>
    
  );
}
