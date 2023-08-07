import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";

function OptionsStep({ nextStep, data, step, getImageURL, handleSelectedOptions, selectedOptions }) {

  

  useEffect(() => { 
    //console.log(choices[1]);
   // if(choices && choices[2]) setSelected(choices[2]);
  }, []);


  return (
    <div className="questions six">

    { !data.translations && (<h3>Loading...</h3>)}
    
    {data && data.options_step && data.options_step.map((item) => { 
      return (
        <div className={"question sqmselect " + (selectedOptions[item.q_id] > 0 ? 'hasnumbers' : '')} key={item.q_id}>

          <div className="mark">
            <img className="sqm" src={getImageURL('check.svg')} alt="Square Meter" title="Square Meter" />
          </div>

          <img src={getImageURL(item.q_picture)} alt={item.q_text} title={item.q_text} />
          <div className="sub">
            <h4>{item.q_text}</h4>

            <div className="right">
              <NumberPicker defaultValue={0} min={0} step={1} onChange={value => handleSelectedOptions(item.q_id, value)} />
              <img className="sqm" src={getImageURL('sqmeter.png')} alt="Square Meter" title="Square Meter" />
            </div>

          </div>
        </div>
      )
    })}

    </div>

    
  )
}

export default OptionsStep