import Flooring from "./questions/Flooring";
import RoomsSelector from "./questions/RoomsSelector";
import WallCovering from "./questions/WallCovering";
import InteriorPainting from "./questions/InteriorPainting";
import { useState, useEffect } from "react";


function OptionsStep({ nextStep, data, step, getImageURL, handleSelectedOptions, selectedOptions, handleChoices, choices, hasFreeRooms }) {
  

  

  const handleChange = (type, q_id, value, sp_index) => {
    let v = {
      ...selectedOptions,
    };

    //console.log("handleChange", q_id, type, value, sp_index);
  
    if (!v.hasOwnProperty(q_id)) v[q_id] = [];
    if (!v[q_id][sp_index]) v[q_id][sp_index] = {};
    if (!v[q_id][sp_index][type]) v[q_id][sp_index][type] = {};
   
    v[q_id][sp_index][type] = value;

    handleSelectedOptions({ ...selectedOptions, ...v });

  }


  // useEffect(() => { 
  //   setOptions( selectedOptions );
  // }, [selectedOptions]);


  return (
    <div className="inner">
      
      {choices && choices.service && choices.service === "flooring" && (
        <div className="step">
          <RoomsSelector data={data}  getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>
        
          <Flooring data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} />
        
        </div>)}
      

        {choices && choices.service && choices.service === "wallcovering" && (
        <div className="step">
          <RoomsSelector data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>
        
          <WallCovering data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} />
        
        </div>)}
      

        {choices && choices.service && choices.service === "interiorpainting" && (
        <div className="step">
          <RoomsSelector data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>
        
          <InteriorPainting data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} />
        
        </div>)}
      
        
      

    </div>   
  )
}

export default OptionsStep