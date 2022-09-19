import React, { useState, useEffect } from "react";
// import profile from '../tabs/profilePicture.png'
import '../App.css';
import "../styles/mobile.css";
import "../styles/desktop.css";
import "../styles/tablet.css";
import "../styles/largeDesktop.css";
import { QrReader } from 'react-qr-reader';
// import fake data, that mirrors real data..
import MEDS from "./blockchainDummyDataAll.json";



const Consumer = () => {

  const [medicine, setMedicine] = useState({});
  const [tab, setTab] = useState(1);
  const [data, setData] = useState(null);
  // const [value, setValue] = useState("no data..");
  const [isScan, setIsScan] = useState(false);
  const [scan, setScan] = useState(null);



  //Adding method.
  const add = () => { };


  // filter data 
  const _filter = (id) => {
    let data_ = MEDS.filter((v, k) => v.medId === id);
    // console.log(data_[0]);
    setScan((prev) => prev = data_[0]);
    setData(prev => prev = null);
  }

  // close scan
  const closeScan = () => {
    setData(prev => prev = '');
    setScan(prev => prev = null);
    setIsScan(prev => prev = false);
  }


  // runs when documents is ready.
  useEffect(() => {
    //
    // console.log( MEDS );
    setTab( prev => prev = 1 );
  }, [])



  return (
    <div className="consumer" >

      {/* scan button */}
      <div className="scanMedBtn" >
        <button className="scanBtn"
          onClick={() => setIsScan(prev => prev = !isScan)} >
          Scan Medicine
        </button>
      </div>
      {/* end scan button */}


      <div>
        <div className="referralSection" style={{ textAlign: "center" }} >
          {/* Consumer message */}
          <div className="pointsMsg">
            Validate and Gain Points!
          </div>
          <div>
            <iframe src="https://giphy.com/embed/67ThRZlYBvibtdF9JH" width="250" height="auto" frameBorder="0" className="giphy-embed"  title="bunny">
            </iframe>
          </div>
          <br /><br />
        </div>
      </div>


      {
        isScan && <div className="qrcodeWrapper">

          <div className="closePopUp" >
            <button className="scanBtn"
              onClick={() => closeScan()} >Close</button>
          </div>
          {/* qr code start starts here */}
          <div className="qrcodeContainer" >

            <QrReader onResult={(result, error) => {
              if (!!result) {
                setData(prev => prev = result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
              className="qrScanner" />
            {
              data && <p style={{ backgroundColor: "yellow", padding: "1em" }} >
                {data} {_filter(data)}
              </p>
            }

            <div className={"scanResult"}
              style={{ backgroundColor: scan?.Verified === "1" ? "green" : "red" }} >
              {
                scan && <>
                  <p>Name: {scan?.name}</p>
                  <p>Ex Date: {scan?.expiry_date}</p>
                  <p>Made By: {scan?.made_by}</p>
                  <p>Infor: {scan?.information}</p>
                  <p>Approve: {scan?.approve_by}</p>
                  <p>Side Effect: {scan?.side_effect}</p>
                </>
              }
            </div>
          </div>
          {/* qr code ends here */}
        </div>
      }




      <div >
        {
          tab === 1 ? (

            <div className="inputMedsId" >
              <input onChange={(e) => setMedicine({ ...medicine, MedicineName: e.target.value })}
                placeholder="Medicine ID" className="input_" />
              <br />
              <button className="validateBtn" onClick={() => add()} >
                Validate
              </button>

            </div>
          ) :
            tab === 2 ? (
              data && data.map((val, key) => (
                <div className="manuData" >
                  data -- value
                </div>
              ))
            ) :
              tab === 3 ? "Track Data" :
                "Wrong Tab"
        }
      </div>



    </div>


  )
}

export default Consumer;
