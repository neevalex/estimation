import { useEffect, useState } from "react";
import Flooring from "./questions/Flooring";
import RoomsSelector from "./questions/RoomsSelector";

function OptionsStep({ nextStep, data, step, getImageURL, handleSelectedOptions, selectedOptions, handleChoices, choices, hasFreeRooms }) {
    
  const handleChange = (type, q_id, value) => {
    let v = {
      ...selectedOptions,
    };

    if (!v.hasOwnProperty(q_id))  v[q_id] = {};
    v[q_id][type] = value;
    handleSelectedOptions({...selectedOptions, ...v});
  }


  // useEffect(() => { 
  //   setOptions( selectedOptions );
  // }, [selectedOptions]);


  return (
    <div className="inner">
      <div className="step">
        <RoomsSelector data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  handleChoices={ handleChoices } choices={choices} />
        
        <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
        </div>
        
        <Flooring data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} hasFreeRooms={ hasFreeRooms } />
      </div>
    </div>   
  )
}

export default OptionsStep