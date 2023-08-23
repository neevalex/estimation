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
  const [selectiontoggle, setSelectionToggle] = useState({});
  const [servicesPool, setServicesPool] = useState([]);


  useEffect(() => {

    if (selectedRooms.id) {
      let newSelected = choices.servicerooms;
      if (!newSelected) newSelected = {};
      if (!newSelected[selectedRooms.id]) newSelected[selectedRooms.id] = [];
      newSelected[selectedRooms.id].push(selectedRooms.room);
     // console.log(selectedRooms.room);

      handleChoices('servicerooms', newSelected);
    }

    if (!servicesPool.length && data && data.flooring_step) {
      let pool = [];
      data.flooring_step.map((item) => { 
        return pool.push(item.q_id);
      });
       setServicesPool(pool);
    }

    if(choices.servicesPool) setServicesPool(servicesPool => ({ ...servicesPool ,...choices.servicesPool }));
    

  }, [selectedRooms , selectiontoggle]);

 
  
  const selectServiceRoom = async (id, index) => { 
    
    if (!hasFreeRooms) return;
    //console.log('togg');
    let nr = selectiontoggle;

    if (!nr) nr = {};
    if (!nr[id]) nr[id] = [];
    if(!nr[id][index]) nr[id][index] = false;

    nr[id][index] = !selectiontoggle[id][index];
    //console.log(nr);
    setSelectionToggle(nr);
    handleChoices('servicerooms', choices.servicerooms);
    
  }

  const setRoomservice = (id, room, sp_index) => { 

      let newChoices = choices;
      if (!newChoices.rooms) newChoices.rooms = [];
      if (!newChoices.rooms[room]) newChoices.rooms[room] = [];
      newChoices.rooms[room].push(id);
      handleChoices(newChoices);
    
      data['rooms_step'].map((sdata) => {
        
        if (sdata.q_id === room) {
          if (sdata.default_size ) {
            // console.log(sdata.default_size);
            // handleChange('room', id, room, sp_index);
            handleChange('price_per_m', id, Number(sdata.default_size), sp_index);
            let sp = servicesPool;
            sp.push(id)
            setServicesPool( sp );
            handleChoices('servicespool', servicesPool);
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
      
      
        {data && data.flooring_step && servicesPool && data.flooring_step.map((item) => { 
        

          let sp_index_size = servicesPool.filter(x => x === item.q_id).length;
          let output = [];

          for (let sp_index = 0; sp_index < sp_index_size; sp_index++) {
            output[sp_index] = (
              <div key={'q_' + sp_index + '_' + item.q_id} id={'q_' + sp_index + '_' + item.q_id} className={"question sqmselect " + (selectedOptions[item.q_id] &&selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] != null ? 'hasnumbers hasroom' : '') + (selectiontoggle && selectiontoggle[item.q_id] && selectiontoggle[item.q_id][sp_index] ? ' hasselectionprocess' : '')}  >
                <div className="message">
                  {hasFreeRooms && (<>Click to choose rooms</>)}
                  {!hasFreeRooms && (<>Please choose some rooms first</>)}
                </div>

                <div className="mark">
                  <img className="sqm" src={getImageURL('check.svg')} alt="Checked" title="Checked" />
                </div>

                {choices && choices.servicerooms && choices.servicerooms[item.q_id] && (
                  <div className="selectedroom">
                    {choices.servicerooms[item.q_id][sp_index]}
                  </div>)}


                <div className="roomselector">
                  <div className="title">
                    Which room you want to apply {item.q_text} for?
                  </div>
              
              
                  {choices && choices.rooms && (
                    <div className="rooms">

                      {Object.keys(choices.rooms).map((room, key) => {
                        if (choices.servicerooms && Object.values(choices.servicerooms).indexOf(room) > -1) return;
                        return (
                          <div className="room" onClick={() => { setSelectedRooms({ 'id': item.q_id, 'room': room, 'index': sp_index }); setRoomservice(item.q_id, room, sp_index); }}>{room}</div>
                        )
                      })}
                  
                    </div>
                  )}
              
                </div>



                <div className="image" style={{
                  backgroundImage: `url("${getImageURL(item.q_picture)}")`
                }} onClick={() => { selectServiceRoom(item.q_id, sp_index); }}>
              
                  <div className="title-holder"><h4>{item.q_text} {( (sp_index > 0) && !(selectedOptions[item.q_id] && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'])) > 0 ? '+' : ''}</h4></div>
                </div>
            
                {choices && choices.servicerooms && choices.servicerooms[item.q_id] && choices.servicerooms[item.q_id][sp_index] && (<div className="sub">

                  <div className="row">
                    <p>Area size in sq. meters
                      <Tippy content="Some text here">
                        <button className="tip">?</button>
                      </Tippy>
                    </p>

                    <div className="right">
                      <img className="sqm" src={getImageURL('sqmeter.png')} alt="sq. meters" title="sq. meters" />
                  
                      <NumberPicker min={0} step={1} value={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] > 0 ? selectedOptions[item.q_id][sp_index]['price_per_m'] : 0} onChange={value => handleChange('price_per_m', item.q_id, value, sp_index)} />

                    </div>
                  </div>

                  <div className={selectedOptions[item.q_id] && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] > 0 ? "subitems active" : 'subitems'}>

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
                            <div key={item.q_id +'_'+sp_index+ '_removeoldcoating_radio_' + key}>
                              <input type="radio" name={item.q_id +'_'+sp_index+ '_removeoldcoating'} className={item.q_id + '_removeoldcoating'} value={condition} onChange={value => handleChange('removeoldcoating', item.q_id, value.target.value, sp_index)} id={item.q_id +'_'+sp_index+ '_removeoldcoating_' + key} checked={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['removeoldcoating'] === condition ? 'checked' : ''} />
                              <label htmlFor={item.q_id +'_'+sp_index+ '_removeoldcoating_' + key}>{conditions[condition]}</label>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['removeoldcoating'] === 'removeoldcoatingyes' && (
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
                              <div key={item.q_id +'_'+sp_index+ '_regreage_radio_' + key} >
                                <input type="radio" name={item.q_id +'_'+sp_index+ '_regreage'} className={item.q_id + '_regreage'} value={condition} onChange={value => handleChange('regreage', item.q_id, value.target.value, sp_index)} id={item.q_id +'_'+sp_index+ '_regreage_' + key} checked={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['regreage'] === condition ? 'checked' : ''} />
                                <label htmlFor={item.q_id +'_'+sp_index+ '_regreage_' + key}>{regreage[condition]}</label>
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
                            <div key={item.q_id +'_'+sp_index+ '_skirting_radio_' + key} >
                              <input type="radio" name={item.q_id +'_'+sp_index+ '_skirtingboards'} className={item.q_id + '_skirtingboards'} value={condition} onChange={value => handleChange('skirtingboards', item.q_id, value.target.value, sp_index)} id={item.q_id +'_'+sp_index+ '_skirtingboards_' + key} checked={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['skirtingboards'] === condition ? 'checked' : ''} />
                              <label htmlFor={item.q_id +'_'+sp_index+ '_skirtingboards_' + key}>{skirtingboards[condition]}</label>
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
                            <div key={item.q_id +'_'+sp_index+ '_furniture_radio_' + key} >
                              <input type="radio" name={item.q_id +'_'+sp_index+ '_furniture'} className={item.q_id + '_furniture'} value={condition} onChange={value => handleChange('furniture', item.q_id, value.target.value, sp_index)} id={item.q_id +'_'+sp_index+ '_furniture_' + key} checked={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['furniture'] === condition ? 'checked' : ''} />
                              <label htmlFor={item.q_id +'_'+sp_index+ '_furniture_' + key}>{furniture[condition]}</label>
                            </div>
                          )
                        })}
                      </div>
                    </div>




                  </div>
  



                </div>)}
              </div>
            )
          }

          return output;
      })}

      </div>

      
  </div>

  )
}

export default Flooring