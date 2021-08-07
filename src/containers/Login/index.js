import React, {useState, useContext} from 'react';
import './login.scss';
import { MailIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { UserSessionContext } from '../../contexts/UserSession';
import { useHistory } from "react-router-dom";

export default function Login() {
  
  let history = useHistory();
  const { updateUsername } = useContext(UserSessionContext);
  const [isFetching, setIsFetching] = useState(false);
  const [loginResponse, setLoginResponse] = useState('');

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

  function isValidPasswordFormat(password) {
    // Password should contain at least 1 uppercase letter, 1 number, and be between 8 to 16 characters
    // Alphanumuric only
    var res = password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,17}$/);
    return (res !== null);
  }

  const onSubmit = (event) =>{
    setIsFetching(true);
    console.log('onsubmitaction');
    event.preventDefault();
    var username = event.target.username.value;
    var password = event.target.password.value;
    console.log(username);
    console.log(password);
    console.log(isValidUsernameFormat(username));
    console.log(isValidPasswordFormat(password));
    var reqData = {
      username: username,
      password: password
    }

    if(isValidPasswordFormat(password) && isValidUsernameFormat(username)){
      const response = axios.post(`https://jom123.loca.lt/loginAccount`, reqData, config)
      .then((result) => {
        console.log('login success');
        console.log(result);
        if(result.data.status == 'not-ok'){
          console.log(result.data.message);
          setLoginResponse(result.data.message);
        } else if (result.data.status == 'ok'){
          setLoginResponse(result.data.message);
          updateUsername(username);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log('login unsuccessful');
        console.log(error);
        setLoginResponse("Error in logging into account");
      }).then(() => {
        setIsFetching(false);
      });
    }
    else {
      setLoginResponse("Format is incorrect");
      setIsFetching(false);
    }
  }

  return (
    <div>

      <div class="login-div mt-10">

        <div class="login login-session">
          <div class="login-left">
            <svg enable-background="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
              
            </svg>
          </div>

          {isFetching? 
            <div class='login-loader'>
                <Loader
                  type="Bars"
                  color="rgb(182,157,230)"
                  height={250}
                />
            </div>
          :
            <form method="post" onSubmit={onSubmit} class="log-in" autoComplete="off">
              <h4><span>Jom</span> login</h4>
              <p>Welcome back!</p>

              <div class="login-floating-label">
                <input placeholder="Username" type="text" name="username" id="username" autoComplete="off" 
                  pattern="[A-Za-z0-9._]{4,20}"
                  title="Username must be in alphanumeric between 4 to 20 characters"/>
                <label for="username">Username</label>
                  <div class="icon">
                    <UserIcon />
                  </div>
              </div>

              <div class="login-floating-label">
                <input placeholder="Password" type="password" name="password" id="password" autoComplete="off" />
                  <label for="password">Password</label>
                  <div class="icon">
                    <LockClosedIcon/>
                  </div>
              </div>

              
              <p style={{ margin: 0, color:'#CA3433'}}>{loginResponse}</p>
              <button type="submit">Log in</button>
              

              <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end', width:'100%' }}>
                <a href="/Jom/Register" class="discrete" target="">Register</a>
                <a href="/Jom/Forgot_password" class="discrete" target="">Forgot password</a>
              </div>

            </form>
          }
        </div>
      </div>

    </div>
    
  );
}
