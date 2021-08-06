import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './Goto.css';
import axios from 'axios';
import "./Goto.css";
import Loader from "react-loader-spinner";

export default function Goto() {

  const [goToLink, setGoToLink] = useState('');
  const [boxInformation, setBoxInformation] = useState(<Loader
    type="TailSpin"
    color="#00BFFF"
    height={40}
  />);

  useEffect(()=>{ 
    // [!] Retrieve last segment of the URL
    const thePath = window.location.href;
    console.log('the path -> ', thePath);
    const lastItem = thePath.substring(thePath.lastIndexOf('/') + 1);
    console.log('last item '+lastItem);

    var status;
    const res = axios.post('https://jom123.loca.lt/goto/'+lastItem)
      .then(result => {
        console.log(result);
        if(result.data.status == 'ok'){
          setGoToLink(result.data.redirectLink);

          setBoxInformation(
            <div>
              <p class="font1 headerGotoMessage">Redirecting to</p>
              <p class="font2 childGotoMessage"><a href={result.data.redirectLink}>{result.data.redirectLink}</a></p>
            </div>
          );
          setTimeout(() => {
            window.location.href = result.data.redirectLink;
          }, 800000);
        } else if(result.data.status == "not-ok"){
          setBoxInformation(
            <div>
              <p class="font1 headerGotoMessage">Go-to link is invalid</p>
              <p class="font2 childGotoMessage">No URL registered under this key</p>
            </div>
          );
        }
      })
      .catch(error => {console.log("ERROR!"); console.log(error);});

  },[])
  return (
    <div class="justify-center"> 

      <div>
        <div class="space my-16" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>

          <div class="gotoCard">
              <div class="well-ProgressGroup">
                <div class="well-background--concept1 well-ProgressGroup--progress" style={{width: "100%", animationDelay: "3s", zIndex: -1, height: "15px"}}></div>
              </div>
            <div class="my-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {boxInformation}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
