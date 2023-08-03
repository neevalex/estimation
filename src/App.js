import { useEffect, useState } from "react";
import Header from "./components/Header";
import getImageURL from "./functions/getImageURL";
import Steps from "./components/Steps";
import IndexStep from "./steps/IndexStep";
import FormStep from "./steps/FormStep";
import PdfStep from "./steps/PdfStep";
import './scss/index.scss';

function App() {

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

  const [state, setState] = useState({
    prevButtonState: false,
    nextButtonState: false
  });

  const checkState = ( forcedStep  ) => { 

    let v_prevButtonState = false;
    let v_nextButtonState = false;

    if (forcedStep <= 2) {
      v_nextButtonState = true;
    }

    if (forcedStep > 1) {
      v_prevButtonState = true;
    }

    setState({ prevButtonState: v_prevButtonState, nextButtonState: v_nextButtonState });

  }

  const nextStep = (enabled) => {
    if (!enabled) return false;
    let newStep = step + 1;
    if (step < 3) {
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


  useEffect(() => {
    getData();
    checkState(step);
  }, []);

  return (
    <div className="App">
      <Header setStep={ setStep } />
      <Steps state={ state } step={step} nextStep={nextStep} prevStep={ prevStep } />
      <div className="cnt">
        {step === 1 && (<IndexStep nextStep={nextStep} data={data} getImageURL={getImageURL} />)}
        {step === 2 && (<FormStep data={data} getImageURL={getImageURL} />)}
        {step === 3 && (<PdfStep />)}
      </div>
    </div>
  );
}

export default App;
