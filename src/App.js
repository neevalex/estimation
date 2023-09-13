import { useEffect, useState } from "react";

import Header from "./components/Header";
import getImageURL from "./functions/getImageURL";
import Steps from "./components/Steps";
import BottomNavigation from "./components/BottomNavigation";
import IndexStep from "./steps/IndexStep";
import OptionsStep from "./steps/OptionsStep";
import FormStep from "./steps/FormStep";
import PdfStep from "./steps/PdfStep";
import "react-widgets/styles.css";
import './scss/index.scss';
import React from 'react';
import 'tippy.js/dist/tippy.css'; // optional


function App({ getTranslation, getData , data }) {

  const [cfData, setcfData] = useState({});
  const [cfError, setcfError] = useState('');

  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState({});
  const [total, setTotal] = useState(0);
  const [pdfRows, setPdfRows] = useState({});
  const [hasFreeRooms, sethasFreeRooms] = useState(false);
  const [state, setState] = useState({
    prevButtonState: false,
    nextButtonState: false
  });



  const sendData = async (data) => { 
    //console.log(data);
    
    let url = process.env.REACT_APP_BACKEND_HOST + '/email.php';
    fetch( url , {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
         'Content-type': 'Content-Type: application/x-www-form-urlencoded; charset=utf-8',
      },
   })
     .then((res) =>
       console.log(res.text()))
      .catch((err) => {
         console.log(err);
      });
  }

  const nextStep = (enabled) => {
    if (!enabled) return false;
    let newStep = step + 1;

    if (step === 3 && checkFormInputs()) {
      console.log(cfData);  
      sendData({ action: 'send', email: cfData, pdf: {'cfData': cfData, 'pdfRows' : pdfRows, 'total': total } });
    }

    if (step < 4) {
      setStep(newStep);
    }

    window.scrollTo(0, 0);
   // checkState(newStep);
  }

  const prevStep = (enabled) => {
    if (!enabled) return false;
    let newStep = step - 1;
    if (step > 1) {
      setStep(newStep);
    }

    //checkState(newStep);
  }

  const handleChoices = (type, stepChoice) => { 
  
    let newChoices = choices;
    if (!newChoices) newChoices = {};
    newChoices[type] = stepChoice;

    setChoices({ ...choices, ...newChoices });

  }

  const [selectedOptions, setSelectedOptions] = useState({});

  function handleSelectedOptions(value) {
    setSelectedOptions({...selectedOptions, ...value});
    //console.log(selectedOptions);
  }



  const calculateTotals = () => { 

    let newPdfRows = {};
    //if (!newPdfRows) newPdfRows = {};

    let final_total = 0;
    if (choices && choices.service) {
      let total_step = choices.service + '_step';  //flooring

      if (selectedOptions) {
        Object.keys(selectedOptions).map((option_name, option_key) => {
          // console.log(selectedOptions[option_name]);
          Object.keys(selectedOptions[option_name]).map((a_index, sub_option_key) => {
            let amount = selectedOptions[option_name][a_index]['price_per_m'];
            

            Object.keys(selectedOptions[option_name][a_index]).map((data_key, service_index) => { 

              let service_data_key = selectedOptions[option_name][a_index][data_key];
              
              if (Number.isInteger(service_data_key)) service_data_key = 'price_per_m'; // selectedOptions[option_name][a_index]; // value is not text, so take it's key name instead of value
              
              
              if (!data[total_step]) return false;
              let lastArrKey = 0;
              let roomTotal = 0;
              data[total_step].map((data_item, datakey) => {
              
                //console.log(option_name);
              if (data_item === null) return false;
              
              if (choices.servicerooms[option_name] && choices.servicerooms[option_name][a_index] && data_item.q_id === option_name) {
                let room = choices.servicerooms[option_name][a_index];

                if (service_data_key === 'price_per_m') {

                  if (amount > 0) {
                    final_total += (parseInt(data_item[service_data_key]) * amount) + 60;
                    roomTotal += (parseInt(data_item[service_data_key]) * amount);
                  }

                  let csn = data_item['custom_service_name'];
                  
                  if (!newPdfRows[room]) newPdfRows[room] = [];
                  //if (!newPdfRows[room][option_name]) newPdfRows[room][option_name] = [];

                  let am = ' (' + amount + ' '+getTranslation('sq_meter')+')';
                    if (csn) am = ' (' + amount + ' '+csn+')';
              
                  lastArrKey = newPdfRows[room].push({ 'id': option_name, 'key': service_data_key, 'room': room, 'name': getTranslation(option_name+'_pdf') + am, 'amount': (parseInt(data_item[service_data_key]) * amount) });
                  roomTotal += (parseInt(data_item[service_data_key]) * amount);
                  // console.log(newPdfRows);
                } else {
                  
                  if (data_item[service_data_key]) {
                    //console.log(service_data_key, newPdfRows[room].length-1);
                    final_total += (parseInt(data_item[service_data_key]) * amount);
                    roomTotal += (parseInt(data_item[service_data_key]) * amount);
                    let newAdditional = newPdfRows[room][newPdfRows[room].length-1]['additional'];
                    if (!newAdditional) newAdditional = [];

                    let newLine = {};
                    newLine[service_data_key] = { 'key': service_data_key, 'amount': (parseInt(data_item[service_data_key]) * amount) };
                    
                    newAdditional = { ...newAdditional, ...newLine };
                    newPdfRows[room][newPdfRows[room].length-1]['additional'] = newAdditional;
                  }
                }
                if (roomTotal > 0) {
                  newPdfRows[room][newPdfRows[room].length-1]['roomTotal'] = roomTotal;
                }
              }
                
                

            });
          });


          });
        });

       
      }

    }
    //console.log(final_total);
    setTotal(final_total);
    setPdfRows(newPdfRows);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkFormInputs = () => { 
    let verdict = true;
    setcfError(''); 

    if (!cfData) return false;
    if (!cfData.hasOwnProperty('name')) {
      verdict = false;
      setcfError(getTranslation('error1'));
    } else if (cfData.name.length < 3) {
      verdict = false;
      setcfError(getTranslation('error2'));
    }

    if (!cfData.hasOwnProperty('pro')) {
      verdict = false;
      setcfError(getTranslation('error10'));
    }

    if (!cfData.hasOwnProperty('email')) {
      verdict = false;
      setcfError(getTranslation('error3'));
    } else if(!validateEmail(cfData.email)) {
        verdict = false;
        setcfError(getTranslation('error4'));
      
    }

    if (!cfData.hasOwnProperty('phone')) {
      verdict = false;
      setcfError(getTranslation('error5'));
    } else if (cfData.phone.length < 3) {
      verdict = false;
      setcfError(getTranslation('error6'));
    }

    if (!cfData.hasOwnProperty('address')) {
      verdict = false;
      setcfError(getTranslation('error7'));
    } else if (cfData.address.length < 8) {
      verdict = false;
      setcfError(getTranslation('error8'));
    }

    if (!cfData.hasOwnProperty('urgent')) {
      verdict = false;
      setcfError(getTranslation('error9'));
    }

    return verdict;
  }

  useEffect( () => {
    
    let forcedStep = step;
    //console.log(choices);
    let v_prevButtonState = false;
    let v_nextButtonState = false;

    if (forcedStep <= 3) { // Next Button
      if (step === 1 && choices && choices.service) v_nextButtonState = true;
      if (step === 3 && checkFormInputs()) v_nextButtonState = true;
      if (step === 2 && total > 0 ) v_nextButtonState = true;
    }

    if (forcedStep > 1) { // Prev Button
      v_prevButtonState = true;
    }

    
    if (choices.rooms ) {

      if (Object.keys(choices.rooms).length > 0) {
        sethasFreeRooms(true);
      } else {
        sethasFreeRooms(false);
      }
    }

    setState({ prevButtonState: v_prevButtonState, nextButtonState: v_nextButtonState });
    calculateTotals();

  }, [step, cfData, choices, selectedOptions]);

  return (
    <div className="App">
      <Header setStep={setStep} />

        <Steps state={ state } step={step} nextStep={nextStep} prevStep={ prevStep } />
        <div className="cnt">
          {step === 1 && (<IndexStep getTranslation={ getTranslation } nextStep={nextStep} data={data} getImageURL={getImageURL} step={step} handleChoices={handleChoices} choices={ choices } />)}
          {step === 2 && (<OptionsStep getTranslation={ getTranslation } nextStep={nextStep}  data={data} getImageURL={getImageURL} step={step} handleSelectedOptions={handleSelectedOptions} selectedOptions={selectedOptions} handleChoices={handleChoices} choices={choices} hasFreeRooms={ hasFreeRooms } />)}
          {step === 3 && (<FormStep cfError={cfError } cfData={cfData} setcfData={ setcfData } getTranslation={ getTranslation } data={data} getImageURL={getImageURL} />)}
          {step === 4 && (<PdfStep getTranslation={getTranslation} getImageURL={getImageURL} pdfRows={pdfRows} total={total} cfData={cfData} sendData={sendData} />)}
        </div>
      <BottomNavigation getTranslation={ getTranslation } state={state} step={step} nextStep={nextStep} prevStep={prevStep} />
   
      {process.env.REACT_APP_ENVIRONMENT === 'development' && (
        <footer>
          <pre> !!!DEV DATA!!! </pre>
          <pre>Price : <strong>{JSON.stringify(total, null, 2)}€</strong> </pre>
          <pre>{JSON.stringify(pdfRows, null, 2)}</pre>
          <pre>{JSON.stringify(choices, null, 2)}</pre>
          <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
        </footer>)}
        
    </div>
  );
}

export default App;
