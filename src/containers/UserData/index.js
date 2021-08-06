import React, { useState, useEffect, useRef, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import axios from 'axios';
import './userData.css';
import Loader from "react-loader-spinner";
import { SaveIcon, TrashIcon } from '@heroicons/react/outline';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { UserSessionContext } from '../../contexts/UserSession.js';


export default function UserData() {

  const { currentUsername } = useContext(UserSessionContext);

  let config = {
    headers: {
      "Bypass-Tunnel-Reminder": "-",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


  const [urlKeyList, setUrlKeyList] = useState([]);
  const [hasChange, setHasChange] = useState(false);
  const [tableData, setTableData] = useState();
  const [isMount, setIsMount] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const urlListDivRef = useRef(null);

  const [updateResponse, setUpdateResponse] = useState("Update response text");

  // [!] Remove?
  const [loadErrorMessage, fetchErrorMessage] = useState();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }


  function deleteLink(ownerUsername, UrlKey, index){
    console.log('indexxxx -> '+ index);
      
    var reqBody = {data: { ownerUsername: ownerUsername, urlKey: UrlKey }};
    var res = axios.delete(`https://jom123.loca.lt/delete/`+UrlKey, reqBody, config)
    .then((result) => {
      console.log('Success!'); 
      console.log(result);
      var urlKeyListCopy = [...urlKeyList];
      if (index !== -1 ){
        urlKeyListCopy.splice(index,1);
        setUrlKeyList(urlKeyListCopy);
      }
    })
    .catch((error) => {
      console.log('Error!'); 
      console.log(error);
    });

  }

  function updateUrlKey(newUrlKey, oldUrlKey, index){
    setLoading(true);
    console.log(newUrlKey);
    console.log(oldUrlKey);
    const res = axios.post('https://jom123.loca.lt/update/'+oldUrlKey, {oldUrlKey: oldUrlKey, newUrlKey: newUrlKey, ownerUsername: currentUsername}, config)
    .then((result) => {
      console.log('result of response ->');
      console.log(result);
      if(result.data.status == 'success'){
        setUpdateResponse('Update successful!');
        console.log('update successful');

        // Update Url list to match newly updated keys
        var urlKeyListCopy = [...urlKeyList];
        var indexCopy = JSON.parse(urlKeyListCopy[index]);
        indexCopy["urlKey"] = newUrlKey;
        indexCopy = JSON.stringify(indexCopy);
        urlKeyListCopy[index] = indexCopy;
        setUrlKeyList(urlKeyListCopy);
      
      } else {
        
        // result.data.message and result.data.error will go to
        // catch block if the response does not have the attribute
        // consider changing to hasOwnProperty
        if (result.data.message)
          setUpdateResponse(result.data.message);
        else if (result.data.error.message)
          setUpdateResponse(result.data.error.message);
        else setUpdateResponse('Error in updating URL Key');
      }
    })
    .catch((error) => {
      console.log(error);
      setUpdateResponse('Error in updating URL Key');
    })
    .then(() => {
      setLoading(false);
      openModal();
    });
  
  }

  useEffect(()=>{
    // Get current username from storage
    // ...

    const res = axios.post(`https://jom123.loca.lt/batchRetrieve`, {ownerUsername: currentUsername}, config)
      .then((result) => {
        console.log(result);
        var data = result.data;
        data.sort((a, b) => {return parseFloat(b.createdDateUNIX) - parseFloat(a.createdDateUNIX); });
        var sortedData = data.map(JSON.stringify);

        setUrlKeyList(oldArray => [...oldArray, ...sortedData]);

        console.log(urlKeyList[1]);
        setHasChange(true);
      })
      .catch((err) => console.log(err))
      .then(()=> setIsMount(true));
  },[]);

  useEffect(()=>{
    console.log(hasChange);
    console.log('is mount changed')
    console.log(isMount);
    setTableData();

      console.log('Updating cards with personal URLs!');
      var fullTable = [];

      var fullKeyList = urlKeyList;
      console.log(urlKeyList);
      console.log(fullKeyList);
      fullKeyList.map( (dataString, index) => {
        var data = JSON.parse(dataString);
        var urlLink = window.location.protocol + '//' + window.location.host + '/goto/' + data.urlKey;
        var originalLink = data.redirectLink;

        // For deleting
        var ownerUsername = currentUsername;
        var deleteUrlKey = data.urlKey; 
        var placeHolderValue = "Change url key " + data.urlKey + " ?"

        fullTable.push(
          <div className="col-span-6 sm:col-span-3 urlBox my-4 rounded-md dataCard">
            <div className="m-4 mt-8 flex flex-row h-6 items-center">
              <div className="flex-grow">
                <input
                  name={data.urlKey}
                  type="text"
                  key={data.urlKey}
                  placeholder={placeHolderValue}
                  className="mt-1 block w-full shadow-sm sm:text-sm border-2 border-gray-700 rounded-md urlBox inputBox"
                  // onChange setstate is not possible as it may cause infinite update
                  // solution is to leave the input blank
                />
              </div>
              <div className="w-12 flex-grow-0 ">
                <SaveIcon className="block h-8 w-8 saveIcon" aria-hidden="true" onClick={() => { console.log('saveicon click '); updateUrlKey(urlListDivRef.current[data.urlKey].value, data.urlKey, index);}}/>
              </div>
              <div className="w-12 flex-grow-0 ">
                <TrashIcon className="block h-8 w-8 trashIcon" aria-hidden="true" onClick={()=>{deleteLink(ownerUsername, deleteUrlKey, index);}}/>
              </div>
            </div>
            <div className="m-5">
              <p className="font2 UD-Text1"><a href={urlLink}>{urlLink}</a></p><br/>
              <p className="font2 UD-Text2"> &gt; <a href={originalLink}>{originalLink}</a></p><br/>
              <p className="font3 UD-Text3"> Created <u>{data.createdDateUNIX}</u> UNIX EPOCH </p>
            </div>
          </div>
        );
      });
      setTableData(fullTable);
  }, [urlKeyList]);

  // useEffect(() => {

  // }, [isLoading]);

  return (
    // <div class="justify-center" style={{ display:'flex', backgroundColor:'#DFE0CA', height:'100%'}}>
    <div class="justify-center my-8" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>

        <div class="my-2 mb-4" style={{ display:'flex', width: '25%', height:50, alignItems:'center', justifyContent:'center', backgroundColor:'#242522', alignSelf:'center', textAlign:'center', color:'white'}}>
          <p>
            Your shortened Links
          </p>
        </div>
        <div>
        </div>
      {/* <button onClick={openModal}>Open Modal</button> <- for testing only */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center'}}>
          <p className="UD-Text1 font2">{updateResponse}</p>
          <button onClick={closeModal} style={{marginTop:'0.8em', width:'100%', backgroundColor:'rgb(98,98,98)', color:'white', textAlign:'center'}}>close</button>
        </div>
      </Modal>

        {/* uncomment for loading */}
        {isLoading?
          <div className="loadingOperationDimContainer">
            
                <Loader
                  type="Bars"
                  color="#00BFFF"
                  height={300}
                />
          </div>
          : <></>
        }

        {/* {isMount?
        tableData
        :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={300}
          />
        </div>
        } */}

        <form ref={urlListDivRef} className="formDiv">
          {tableData}
        </form>
      
    </div>
  );
}
