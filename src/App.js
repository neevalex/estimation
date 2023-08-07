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


function App() {

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const getData = async () => {
    const url = 'http://localhost:8000';

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

  const [state, setState] = useState({
    prevButtonState: false,
    nextButtonState: false
  });

  const checkState = (forcedStep) => { 
    
    //console.log(choices);
    let v_prevButtonState = false;
    let v_nextButtonState = false;

    if (forcedStep <= 3) { // Next Button
      
      if(step === 1 && choices[1]) v_nextButtonState = true;
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

  const handleChoices = async (stepChoice) => { 
    //console.log('ss'+stepChoice);
    await setChoices({ ...choices, ...stepChoice });
   // await sleep(500);
    //await checkState(step);
  }



  const [selectedOptions, setSelectedOptions] = useState({});

  function handleSelectedOptions(qid, value) {
    
    let choice = [];
    choice[qid] = value;
    setSelectedOptions({...selectedOptions, ...choice});
   // console.log(selectedOptions);
  }


  useEffect( () => {
    getData();
    
    let forcedStep = step;
    //console.log(choices);
    let v_prevButtonState = false;
    let v_nextButtonState = false;

    if (forcedStep <= 3) { // Next Button
      if (step === 1 && choices[1]) v_nextButtonState = true;
      if (step === 2 ) v_nextButtonState = true;
      if (step === 3 ) v_nextButtonState = true;
    }

    if (forcedStep > 1) { // Prev Button
      v_prevButtonState = true;
    }

  

    setState({ prevButtonState: v_prevButtonState, nextButtonState: v_nextButtonState });

  }, [step, choices, selectedOptions]);

  return (
    <div className="App">
      <Header setStep={ setStep } />
      <Steps state={ state } step={step} nextStep={nextStep} prevStep={ prevStep } />
      <div className="cnt">
        {step === 1 && (<IndexStep nextStep={nextStep} data={data} getImageURL={getImageURL} step={step} handleChoices={handleChoices} choices={ choices } />)}
        {step === 2 && (<OptionsStep nextStep={nextStep} data={data} getImageURL={getImageURL} step={step} handleSelectedOptions={handleSelectedOptions} selectedOptions={ selectedOptions} />)}
        {step === 3 && (<FormStep data={data} getImageURL={getImageURL} />)}
        {step === 4 && (<PdfStep />)}
      </div>
      <BottomNavigation state={ state } step={step} nextStep={nextStep} prevStep={ prevStep } />
      <footer>
        <pre>{JSON.stringify(choices, null, 2)}</pre>
        <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
      </footer>
    </div>
  );
}

export default App;
