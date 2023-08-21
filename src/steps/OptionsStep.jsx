import Flooring from "./questions/Flooring";
import RoomsSelector from "./questions/RoomsSelector";
import WallCovering from "./questions/WallCovering";

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
      
      {choices && choices.service && choices.service === "flooring" && (
        <div className="step">
          <RoomsSelector data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange} handleChoices={handleChoices} choices={choices} />
        
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
      
        
      

    </div>   
  )
}

export default OptionsStep