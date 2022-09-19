import React, { useState, useEffect } from "react";
import '../App.css';
// import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import MEDS from "./blockchainDummyData.json";


const DATA = [
  {
    "medId": "iugytv85yo#2374diabetes",
    "name": "metformin",
    "expiry_date": "11,22,334",
    "side_effect": "Loss of appetite, Stomach ache, Stomach ache",
    "information": "helps with blood ,",
    "made_by": "clicks",
    "approve_by": "SAHPRA",
    "Verified": "1",
    "quantity": 1
  }, {
    "medId": "498tyn54y9843arv",
    "name": "antiretroviral",
    "expiry_date": "11,22,334",
    "side_effect": "bleeding, heart disease, pancreas damage",
    "information": "pains,",
    "made_by": "pfizer",
    "approve_by": "SAHPRA",
    "Verified": "0",
    "quantity": 50
  }
];

const Manu = () => {
  const [medicine, setMedicine] = useState({});
  const [tab, setTab] = useState(1);
  const [data, setData] = useState();
  const [isScan, setIsScan] = useState(false);
  const [scan, setScan] = useState(null);
  const [Meds, setMeds] = useState(MEDS);
  const [data_, setData_] = useState(DATA);



  // add new data to the blockchain
  const add = () => {
    let fil = data_.filter((v,k) => v?.medId === data )[0];
    Meds.push( fil );
    // console.log( Meds );
    setData(prev => prev = null);
    alert("Medicine Added");

    // if (medicine['DateMade'] && medicine['MedicineName'] && medicine['MedicalUse'] && medicine['ManufacturerName']) {

    //   var myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");

    //   var raw = JSON.stringify({
    //     "DateMade": medicine['DateMade'],
    //     "DateDistr": medicine['DateDistr'],
    //     "MedicineName": medicine['MedicineName'],
    //     "MedicalUse": medicine['MedicalUse'],
    //     "ManufacturerName": medicine['ManufacturerName'],
    //   });

    //   var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //   };

    //   fetch("http://127.0.0.1:5000/add", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
    // }
    // else {
    //   alert("Please Provide All Data");
    // }
  }
  // end of function


  // start function for getting all data
  // const getData = async () => {

  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: {
  //       "Accept": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //       "Access-Control-Allow-Methods": 'POST, PUT, DELETE, GET, OPTIONS',
  //     }
  //   };

  //   await fetch("http://127.0.0.1:5000/showall", requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       setData(prev => prev = result['chain']);
  //       console.log(result['chain']);
  //     })
  //     .catch(error => console.log('error', error));
  // }
  // end function for getting data.


  // close scan
  const closeScan = () => {
    setData(prev => prev = "");
    setScan(prev => prev = null);
    let _d = scan;
    console.log(_d);
    setIsScan(prev => prev = false);
  }


  // 
  useEffect(() => {
    // get all data
    // getData();
    setMeds( prev => prev = MEDS );
    setData_ ( prev => prev = DATA );
  }, [])

  return (
    <div className="manu col-xs-10 col-md-10">

      <div className="scanMedBtns" >
        <button className="scanBtn"
          onClick={() => setTab(prev => prev = 2)} >
          View Medicine
        </button>

        <button
          className="scanBtn"
          onClick={() => setTab(prev => prev = 1)} >
          Add Meds
        </button>

        <button
          className="scanBtn"
          onClick={() => setIsScan(prev => prev = !isScan)} >
          Scan Add
        </button>
      </div>


      {/* qr code scanner */}
      {isScan && <div className="qrcodeWrapper">

        <div className="closePopUp" >
          <button className="scanBtn"
            onClick={() => closeScan()} >Close</button>
        </div>

        <div className="qrcodeContainer" >

          <QrReader borderRadius={20} onResult={(result, error) => {
            if (!!result) { setData(prev => prev = result?.text); }
            if (!!error) { console.info(error); }
          }}
            className="qrScanner" />

          {data && <p className="manufacResult" >
            {data}
          </p>}

          <div className={"scanResult"} >
            {data && <>
              <button onClick={() => add()} className="addMedBtn"  >
                Add
              </button>
            </>}
          </div>
        </div>
        {/* qr code ends here */}
      </div>}




      <div >
        {
          tab === 1 ? (
            <div className="addMeds col-xs-14 col-md-10" >
              {/* <input onChange={(e)=> setMedicine({...medicine, name:e.target.value }) }
                  placeholder="Medicine ID" className="input_" /> */}

              <input onChange={(e) => setMedicine({ ...medicine, MedicineName: e.target.value })}
                placeholder="Medicine Name" className="input_" />

              <input onChange={(e) => setMedicine({ ...medicine, ManufacturerName: e.target.value })}
                placeholder="Manufacturer Name" className="input_" />

              <input onChange={(e) => setMedicine({ ...medicine, MedicalUse: e.target.value })}
                placeholder="Medical Purpose" className="input_" />

              <div className="Medate col-xs-10 col-md-10" style={{ width: "100%" }} >
                <label for="receivedDate"><b> Manufactured Date : </b></label>

                <input onChange={(e) => setMedicine({ ...medicine, DateMade: e.target.value })}
                  className="input_" type="Date" placeholder="Enter Date" /><br />

                <label for="receivedDate"><b> Distributed Date : </b></label>
                <input onChange={(e) => setMedicine({ ...medicine, DateDistr: e.target.value })}
                  className="input_" type="Date" placeholder="Enter Date" />

                {/* <input onChange={(e)=> setMedicine({...medicine, Date:e.target.value }) }
                  className="input_" type="Date" placeholder = "Enter Date"/> */}
              </div>


              <br />
              <button className="addBtn" onClick={() => add()} >
                Enlist
              </button>

            </div>
          ) :
            tab === 2 ? (
              <div className="medsContainer" >
                {
                  Meds && Meds.map((val, key) => (
                    <div className="medicine" >
                      <div className="medName" >{val?.name}</div>
                      <div style={{ display: "flex", flexDirection: "column", paddingTop: "5px" }} >
                        <b>Side Effect </b>
                        <i style={{ fontSide: "13px" }} > {val?.side_effect} </i>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", paddingTop: "5px" }} >
                        <b>Purpose </b>
                        <div style={{display:"flex",justifyContent:"space-between" }} >
                          <i style={{ fontSide: "13px" }} > {val?.information} </i>
                          <i style={{ fontSide: "13px", color:"white" }} > Quantity: {val?.quantity} </i>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>) :
              tab === 3 ? "Track Data" :
                "Wrong Tab"
        }
      </div>


    </div>
  )
}

export default Manu;



// https://forms.gle/xXDk6NjkbTnHkdNw7