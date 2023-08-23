import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";
import Tippy from '@tippyjs/react';

function WallCovering({ data, getImageURL, selectedOptions, handleChange, choices, handleChoices, hasFreeRooms }) {

 
  const wallsneedpreparation = {
    'wallsneedpreparationyes': 'Yes',
    'wallsneedpreparationno' : 'No',
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
      
      
      {data && data.wallcovering_step && data.wallcovering_step.map((item) => { 
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
                  <div className="title">Walls need preparation
                    <Tippy content="explanation here">
                      <button className="tip">?</button>
                    </Tippy>
                  </div>
                  <div className="inputs noradio">
                    <img className="smallicon" src={getImageURL('wall.svg')} alt="Furniture" title="Furniture" />
                    {Object.keys(wallsneedpreparation).map((condition, key) => {
                      return (
                        <div key={item.q_id + '_wallsneedpreparation_radio_' + key} >
                          <input type="radio" name={item.q_id + '_wallsneedpreparation'} className={item.q_id + '_wallsneedpreparation'} value={condition} onChange={value => handleChange('wallsneedpreparation', item.q_id, value.target.value)} id={item.q_id + '_wallsneedpreparation_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['wallsneedpreparation'] === condition ? 'checked' : ''} />
                          <label htmlFor={item.q_id + '_wallsneedpreparation_' + key}>{wallsneedpreparation[condition]}</label>
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

export default WallCovering