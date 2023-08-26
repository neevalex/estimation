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


function App() {

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const getData = async () => {
    const url = process.env.REACT_APP_BACKEND_HOST;

    fetch(url)
    .then(res => res.json())
    .then(data => {
      if( data ) setData( data );
    })
    .catch(rejected => {
        console.log(rejected);
    });

  }

  const [data, setData] = useState({});
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState({});
  const [total, setTotal] = useState(0);
  const [pdfRows, setPdfRows] = useState({});
  const [hasFreeRooms, sethasFreeRooms] = useState(false);
  const [state, setState] = useState({
    prevButtonState: false,
    nextButtonState: false
  });



  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
  }

  const forceUpdate = useForceUpdate();



  const checkState = (forcedStep) => { 
    
    //console.log(choices);
    let v_prevButtonState = false;
    let v_nextButtonState = false;

    if (forcedStep <= 3) { // Next Button
      if(step === 1 && choices && choices.service ) v_nextButtonState = true;
    }



    if (forcedStep > 1) { // Prev Button
      v_prevButtonState = true;
    }

  

    setState({ prevButtonState: v_prevButtonState, nextButtonState: v_nextButtonState });

  }

  const nextStep = (enabled) => {
    if (!enabled) return false;
    let newStep = step + 1;
    if (step < 4) {
      setStep(newStep);
    }
   
    checkState(newStep);
  }

  const prevStep = (enabled) => {
    if (!enabled) return false;
    let newStep = step - 1;
    if (step > 1) {
      setStep(newStep);
    }

    checkState(newStep);
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
              
              //console.log(service_data_key);
              
            if (!data[total_step]) return false;

              data[total_step].map((data_item, datakey) => {
              
                //console.log(option_name);
              if (data_item === null) return false;
              
              if (data_item.q_id === option_name) {
                let room = choices.servicerooms[option_name][a_index];

                if (service_data_key === 'price_per_m') {
                  final_total += (parseInt(data_item[service_data_key]) * amount);
                  
                  if (!newPdfRows[room]) newPdfRows[room] = [];
                  //if (!newPdfRows[room][option_name]) newPdfRows[room][option_name] = [];

                  newPdfRows[room].push({ 'id': option_name, 'key': service_data_key, 'room': room,'name': data_item.q_text + ' (' + amount + 'sq. meters)', 'amount': (parseInt(data_item[service_data_key]) * amount) });
                  // console.log(newPdfRows);
                  setPdfRows(newPdfRows);
                } else {
                  // console.log(data_item);
                  if (data_item[service_data_key]) {
                    
                    final_total += (parseInt(data_item[service_data_key]) * amount);

                    let newAdditional = pdfRows[room][a_index]['additional'];
                    if (!newAdditional) newAdditional = [];

                    let newLine = [];
                    newLine[service_data_key] = { 'key': service_data_key, 'amount': (parseInt(data_item[service_data_key]) * amount) };

                    newAdditional = { ...newAdditional, ...newLine };

                    let newPdfRows = pdfRows;
                    newPdfRows[room][a_index]['additional'] = newAdditional;

                    // setPdfRows(newPdfRows);
                  }
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
  }


  useEffect( () => {
    getData();
    
    let forcedStep = step;
    //console.log(choices);
    let v_prevButtonState = false;
    let v_nextButtonState = false;

    if (forcedStep <= 3) { // Next Button
      if (step === 1 && choices && choices.service) v_nextButtonState = true;
      
      if (step === 2 ) v_nextButtonState = true;
      if (step === 3 ) v_nextButtonState = true;
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

  }, [step, choices, selectedOptions]);

  return (
    <div className="App">
      <Header setStep={ setStep } />
      <Steps state={ state } step={step} nextStep={nextStep} prevStep={ prevStep } />
      <div className="cnt">
        {step === 1 && (<IndexStep nextStep={nextStep} data={data} getImageURL={getImageURL} step={step} handleChoices={handleChoices} choices={ choices } />)}
        {step === 2 && (<OptionsStep nextStep={nextStep} forceUpdate={forceUpdate }  data={data} getImageURL={getImageURL} step={step} handleSelectedOptions={handleSelectedOptions} selectedOptions={selectedOptions} handleChoices={handleChoices} choices={choices} hasFreeRooms={ hasFreeRooms } />)}
        {step === 33 && (<FormStep data={data} getImageURL={getImageURL} />)}
        {step === 3 && (<PdfStep getImageURL={getImageURL} pdfRows={pdfRows} total={ total } />)}
      </div>
      <BottomNavigation state={ state } step={step} nextStep={nextStep} prevStep={ prevStep } />
      <footer>
        {/* <pre> !!!DEV DATA!!! </pre> */}
        <pre>Price : <strong>{JSON.stringify(total, null, 2)}€</strong> </pre>
        <pre>{JSON.stringify(pdfRows, null, 2)}</pre>
        <pre>{JSON.stringify(choices, null, 2)}</pre>
        <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
      </footer>
    </div>
  );
}

export default App;
