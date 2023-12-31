import RoomsSelector from "./questions/RoomsSelector";
import Questions from "./questions/Questions";

function OptionsStep({ getTranslation, data, step, getImageURL, handleSelectedOptions, selectedOptions, handleChoices, choices, hasFreeRooms }) {
  
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


  const deletehandleChange = ( q_id, sp_index) => {
    let v = {
      ...selectedOptions,
    };
  
    delete v[q_id][sp_index];
    handleSelectedOptions({ ...selectedOptions, ...v });
  }
 

  return (
    <div className="inner">
      
      {choices && choices.service && choices.service === "flooring" && (
        <div className="step">
          <RoomsSelector getTranslation={ getTranslation } data={data}  getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>

          <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.flooring_step} subItems={['furniture','removeoldcoating','regreage','skirtingboards']} />
        
        </div>)}
      

        {data && choices && choices.service && choices.service === "wallcovering" && (
        <div className="step">
          <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>

          <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.wallcovering_step} subItems={['furniture','removewallcovering','wallsneedpreparation']} />
        
        </div>)}
      

        {choices && choices.service && choices.service === "interiorpainting" && (
        <div className="step">
          <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>

          <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.interiorpainting_step} subItems={['furniture','removewallcovering','wallsneedpreparation']} />
        
        </div>)}
      
        {choices && choices.service && choices.service === "completerenovation" && (
        <div className="step">
          <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={['house','appartment', 'office']} />
        
          <div className="separator">
            <div className="pre"></div>
            <div className="line"></div>
          </div>

          <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.completerenovation_step} subItems={['flooring','painting','plastering','wallcovering', 'electricity', 'carpentry', 'plumbing', 'insulation']} />
        
        </div>)}

        {choices && choices.service && choices.service === "kitchen" && (
          <div className="step">
            <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={['kitchen']} />
          
            <div className="separator">
              <div className="pre"></div>
              <div className="line"></div>
            </div>

            <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.kitchen_step} subItems={[]} />
          
          </div>)}
      
          {choices && choices.service && choices.service === "electricity" && (
          <div className="step">
            <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
          
            <div className="separator">
              <div className="pre"></div>
              <div className="line"></div>
            </div>

            <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.electricity_step} subItems={[]} />
          
          </div>)}
      

        {choices && choices.service && choices.service === "plumbing" && (
          <div className="step">
            <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices}  rooms={['bathroom','kitchen','toilet', 'other']}  />
          
            <div className="separator">
              <div className="pre"></div>
              <div className="line"></div>
            </div>

            <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.plumbing_step} />
          
          </div>)}

      
          {choices && choices.service && choices.service === "insulation" && (
          <div className="step">
            <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
          
            <div className="separator">
              <div className="pre"></div>
              <div className="line"></div>
            </div>

            <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.insulation_step} />
          
          </div>)}
      

        {choices && choices.service && choices.service === "carpentry" && (
          <div className="step">
            <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices}  rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
          
            <div className="separator">
              <div className="pre"></div>
              <div className="line"></div>
            </div>

            <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.carpentry_step} subItems={['furniture']} />
          
          </div>)}

        {choices && choices.service && choices.service === "disaster" && (
          <div className="step">
            <RoomsSelector getTranslation={ getTranslation } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} rooms={[ 'livingroom', 'toilet', 'kitchen', 'bathroom', 'corridor', 'masterbedroom', 'bedroom', 'desk', 'staircase', 'other']} />
          
            <div className="separator">
              <div className="pre"></div>
              <div className="line"></div>
            </div>

            <Questions getTranslation={ getTranslation } step={ step } data={data} getImageURL={getImageURL} selectedOptions={selectedOptions} handleChange={handleChange}  deletehandleChange={deletehandleChange}  handleChoices={handleChoices} choices={choices} hasFreeRooms={hasFreeRooms} dataSource={data.disaster_step} subItems={[]} />
          
          </div>)}
      

    </div>   
  )
}

export default OptionsStep