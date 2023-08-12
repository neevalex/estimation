import { useEffect, useState } from "react";
import Flooring from "./questions/Flooring";

function OptionsStep({ nextStep, data, step, getImageURL, handleSelectedOptions, selectedOptions }) {
    
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
      <Flooring data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={ handleChange } />
    </div>
    
  )
}

export default OptionsStep