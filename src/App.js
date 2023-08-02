import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import getImageURL from "./functions/getImageURL";
import Steps from "./components/Steps";
import './scss/index.scss';

function App() {

  const getData = async () => {
    const url = 'http://localhost:8000';
    const response = await fetch(url);
    const data = await response.json();
    setData( data );
  }

  const [data, setData] = useState({});
  const [step, setStep] = useState(1);


  useEffect(() => {
    getData();
  }, []);

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <div className="App">
      <Header />
      <Steps step={step} nextStep={nextStep} prevStep={ prevStep } />
      <div className="cnt">
        <div className="questions">

          { !data.translations && (<h3>Loading...</h3>)}
          
          {data && data.index_step && data.index_step.map((item) => { 
            return (
              <div className="question" key={item.q_id} onClick={() => { nextStep() } }  >
                <img src={getImageURL(item.q_picture)} alt={item.q_text} title={item.q_text} />
                <h4>{item.q_text}</h4>
              </div>
            )
          })}

        </div>
      </div>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
