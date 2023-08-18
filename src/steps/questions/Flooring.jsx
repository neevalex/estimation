import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";
import Tippy from '@tippyjs/react';

function Flooring({ data, getImageURL, selectedOptions, handleChange, choices, handleChoices, hasFreeRooms }) {

  const conditions = {
    'removeoldcoatingyes': 'Yes',
    'removeoldcoatingno' : 'No',
  };

  const regreage = {
    'regreageyes': 'Yes',
    'regreageno' : 'No',
  };

  const skirtingboards = {
    'skirtingboardsyes': 'Yes',
    'skirtingboardsno' : 'No',
  };

  const furniture = {
    'furnitureyes': 'Yes',
    'furnitureno' : 'No',
  };

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectiontoggle, setSelectionToggle] = useState([]);



  useEffect(() => {

    let newSelected = choices.servicerooms;
    if (!newSelected) newSelected = {};
    newSelected[selectedRooms.id] = selectedRooms.room;

    handleChoices('servicerooms', newSelected);
  }, [selectedRooms]);


  
  const selectServiceRoom = (id) => { 
    if (choices.servicerooms[id] || !hasFreeRooms) return;
    setSelectionToggle( { ...selectiontoggle, [id]: !selectiontoggle[id] })
  }

  const setRoomservice = (id, room) => { 


      let newChoices = choices;
      if (!newChoices.rooms) newChoices.rooms = [];
      newChoices.rooms[room] = id;
      handleChoices(newChoices);
    
    data['rooms_step'].map((sdata) => {
        
        if (sdata.q_id === room) {
          if (sdata.default_size > 0) {
            // console.log(sdata.default_size);
            handleChange('price_per_m', id, Number(sdata.default_size));
          }
        }

        return true;

      });
    
  }



  
  return (

      <div className="questions">

      <div className="side">
                <div className="label">
                    Services
                </div>
      </div>
        
      <div className="inner">

      {!data.translations && (<h3>Loading...</h3>)}
      
      
      {data && data.flooring_step && data.flooring_step.map((item) => { 
        return (
          <div key={'q_' + item.q_id} className={"question sqmselect " + (selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? 'hasnumbers' : '') + (choices && choices.servicerooms && choices.servicerooms[item.q_id] ? ' hasroom' : '') + (selectiontoggle && selectiontoggle[item.q_id] ? ' hasselectionprocess' : '')}  >
            
            <div className="message">
              {hasFreeRooms && (<>Click to choose rooms</>)}
              {!hasFreeRooms && (<>Please choose more rooms first</>)}
            </div>

            <div className="mark">
              <img className="sqm" src={getImageURL('check.svg')} alt="Checked" title="Checked" />
            </div>

            {choices && choices.servicerooms && choices.servicerooms[item.q_id] && (
            <div className="selectedroom">
              {choices.servicerooms[item.q_id]}
            </div>)}


            <div className="roomselector">
              <div className="title">
                Which room you want to apply {item.q_text} for? 
              </div>
              
              
                {choices && choices.rooms && (
                <div className="rooms">

                  {Object.keys(choices.rooms).map((room, key) => {
                    if (Object.values(choices.servicerooms).indexOf(room) > -1 ) return;
                    return (
                      <div className="room" onClick={() => { setSelectedRooms({ 'id': item.q_id, 'room': room }); setRoomservice(item.q_id, room); }}>{room}</div>
                    )
                  })}
                  
                </div>
              )}
              
            </div>



            <div className="image" style={{
              backgroundImage: `url("${getImageURL(item.q_picture)}")`
            }} onClick={() => { selectServiceRoom(item.q_id); } }>
              
              <div className="title-holder"><h4>{item.q_text}</h4></div>
            </div>
            
            {choices && choices.servicerooms && choices.servicerooms[item.q_id] && (<div className="sub">

              <div className="row">
                <p>Area size in sq. meters
                  <Tippy content="Some text here">
                    <button className="tip">?</button>
                  </Tippy>
                </p>

                <div className="right">
                  <img className="sqm" src={getImageURL('sqmeter.png')} alt="sq. meters" title="sq. meters" />
                  
                  <NumberPicker min={0} step={1} value={selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? selectedOptions[item.q_id]['price_per_m'] : 0} onChange={value => handleChange('price_per_m', item.q_id, value)} />

                  {/* <input id="ticketNum" type="number" min={0} step={1} value={selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? selectedOptions[item.q_id]['price_per_m'] : 0} onChange={event => handleChange('price_per_m', item.q_id, Number(event.target.value))}  /> */}
                </div>
              </div>

              <div className={selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? "subitems active" : 'subitems'}>

                <div className='row spoiler' >
                  <div className="title">Remove old coating
                    <Tippy content="Coating text here">
                      <button className="tip">?</button>
                    </Tippy>
                  </div>
                  <div className="inputs noradio">
                    <img className="smallicon" src={getImageURL('crowbar.svg')} alt="Remove old coating?" title="Remove old coating?" />
                    {Object.keys(conditions).map((condition, key) => {
                      return (
                        <div key={item.q_id + '_removeoldcoating_radio_' + key}>
                          <input type="radio" name={item.q_id + '_removeoldcoating'} className={item.q_id + '_removeoldcoating'} value={condition} onChange={value => handleChange('removeoldcoating', item.q_id, value.target.value)} id={item.q_id + '_removeoldcoating_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['removeoldcoating'] === condition ? 'checked' : ''} />
                          <label htmlFor={item.q_id + '_removeoldcoating_' + key}>{conditions[condition]}</label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {selectedOptions[item.q_id] && selectedOptions[item.q_id]['removeoldcoating'] === 'removeoldcoatingyes' && (
                  <div className='row spoiler'>
                    <div className="title">Regreage needed
                      
                    <Tippy content="Regreage text here">
                      <button className="tip">?</button>
                    </Tippy>
                    
                    </div>
                    <div className="inputs noradio">
                      <img className="smallicon" src={getImageURL('level.svg')} alt="Regreage needed?" title="Regreage needed?" />
                      {Object.keys(regreage).map((condition, key) => {
                        return (
                          <div key={item.q_id + '_regreage_radio_' + key} >
                            <input type="radio" name={item.q_id + '_regreage'} className={item.q_id + '_regreage'} value={condition} onChange={value => handleChange('regreage', item.q_id, value.target.value)} id={item.q_id + '_regreage_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['regreage'] === condition ? 'checked' : ''} />
                            <label htmlFor={item.q_id + '_regreage_' + key}>{regreage[condition]}</label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}


                <div className='row spoiler' >
                  <div className="title">Skirting boards
                    <Tippy content="Skirting text here">
                      <button className="tip" >?</button>
                    </Tippy>
                  </div>
                  <div className="inputs noradio">
                    <img className="smallicon" src={getImageURL('board-wood.svg')} alt="Skirting boards" title="Skirting boards" />
                    {Object.keys(skirtingboards).map((condition, key) => {
                      return (
                        <div key={item.q_id + '_skirting_radio_' + key} >
                          <input type="radio" name={item.q_id + '_skirtingboards'} className={item.q_id + '_skirtingboards'} value={condition} onChange={value => handleChange('skirtingboards', item.q_id, value.target.value)} id={item.q_id + '_skirtingboards_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['skirtingboards'] === condition ? 'checked' : ''} />
                          <label htmlFor={item.q_id + '_skirtingboards_' + key}>{skirtingboards[condition]}</label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className='row spoiler' >
                  <div className="title">Supply furniture
                    <Tippy content="Furniture text here">
                      <button className="tip">?</button>
                    </Tippy>
                  </div>
                  <div className="inputs noradio">
                    <img className="smallicon" src={getImageURL('furniture.svg')} alt="Furniture" title="Furniture" />
                    {Object.keys(furniture).map((condition, key) => {
                      return (
                        <div key={item.q_id + '_furniture_radio_' + key} >
                          <input type="radio" name={item.q_id + '_furniture'} className={item.q_id + '_furniture'} value={condition} onChange={value => handleChange('furniture', item.q_id, value.target.value)} id={item.q_id + '_furniture_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['furniture'] === condition ? 'checked' : ''} />
                          <label htmlFor={item.q_id + '_furniture_' + key}>{furniture[condition]}</label>
                        </div>
                      )
                    })}
                  </div>
                </div>




              </div>
  



            </div>)}
          </div>
        )
      })}

      </div>
  </div>

  )
}

export default Flooring