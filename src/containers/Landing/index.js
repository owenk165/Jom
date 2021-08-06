import React, { useState, useEffect, useContext } from 'react';
import './landingcss.css';
import axios from 'axios';
import Loader from "react-loader-spinner";
import UserData from "../UserData";
import {UserSessionContext} from '../../contexts/UserSession';
import FeatureSection from "../../components/FeatureSection";
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

export default function Landing() {

  const { currentUsername } = useContext(UserSessionContext);

  const [bottomSection, setBottomSection] = useState();

  function isValidURL(string) {
    // Check if matches basic url
    var res = string.match(/(^((http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)))+$/g);
    // Check if matches magnet link (magnet:?xt=urn:<anystring>)
    var res2 = string.match(/(^magnet:\?xt=urn:[^\s]{1,})+$/g);
    return (res !== null || res2 !== null);
  };

  useEffect(()=>{
    if (currentUsername != null || currentUsername == "") 
      setBottomSection(<UserData/>);
    else 
      setBottomSection(<FeatureSection/>);
  }, [currentUsername]);

  let config = {
    headers: {
      "Bypass-Tunnel-Reminder":"-",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
  }

  const [newUrl, setNewUrl] = useState();
  const [message, setMessage] = useState('Your shortened URL result will appear here');
  const [isLoadingNewUrl, setLoadingNewUrl] = useState(false);
  const [copyLink, setCopyLink] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const createLink = () => {
      setLoadingNewUrl(true);
      setButtonDisabled(true);
      var trimmedUrl = String(newUrl).trim();
      var reqData = { redirectLink: trimmedUrl };
      if(currentUsername)
        reqData['username'] = currentUsername;
      console.log(reqData);

    if (isValidURL(trimmedUrl)){
      const res = axios.post('https://jom123.loca.lt/createLink', reqData, config)
      .then((result) => {
        console.log(result); 
        var shortenedLink = window.location.protocol + '//' + window.location.host + '/goto/' + result.data.urlKey;
        var expiryDate = result.data.expiryDateUNIX;
        setCopyLink(shortenedLink);
        setMessage(<div>
          <p>Expiring at: {expiryDate} EPOCH</p>
          <a href={shortenedLink}>{shortenedLink}</a> <br/>
          <p>Click to copy</p>
          </div>);
      })
      .catch((error) => {console.log(error); setMessage(String(error))})
      .then(()=>{setLoadingNewUrl(false); setButtonDisabled(false);});}
      else {
        setMessage('Invalid url format!');
        setLoadingNewUrl(false); 
        setButtonDisabled(false);
      }
  }

  return (
    <div class="justify-center"> 

      <div>

        <div class="centeredContainer container mx-auto border-b-2 border-gray-500">
          <div class="py-16">
            <div class="p-6 md:py-10 lg:py-20 text-xl border-l-4 border-gray-700">
              <div class="mt-10" >
                <p1 style={{fontSize:'3.5em',fontWeight:'bold',fontFamily:'Karla'}}>Jom</p1>
              </div>
              <div class="mt-10 mb-5">
                <p1 class="topFont2">Shorten URL Link</p1><br/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                {/* <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label> */}
                <input
                  type="text"
                  name="urlLink"
                  id="urlLink"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="mt-1 block w-full shadow-sm sm:text-sm border-2 border-gray-700 rounded-md urlBox inputBox"
                  onChange = { (e) => setNewUrl(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 urlBox my-4 rounded-md" style={{ backgroundColor:'#D9D9D6', height:100}}>
 
                {isLoadingNewUrl? 
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={40}
                    />
                  </div>
                  :
                  <div className="font2 topFont3" onClick={() => { navigator.clipboard.writeText(copyLink); }}>{message}</div>
                }
                
              </div>
              
              <div class="mt-4">
                <button class="newLink mx-auto sb" disabled={buttonDisabled} onClick={() => createLink()}>Shorten</button>
                {/* <button class="anotherLink mx-auto sb">Shorten</button> */}
                {/* <button class="anotherLink mx-auto sb" onClick={()=>{setButtonDisabled(!buttonDisabled)}}>
                  test  
                  </button> */}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    
      {bottomSection}

    </div>
  );
}
