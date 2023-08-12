import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";


function Flooring({ data, getImageURL, selectedOptions, handleChange }) {

  const conditions = {
    'good' : 'Good',
    'normal' : 'Normal',
    'bad' : 'Bad',
    'hard_to_tell' : 'Hard to tell'
  };

  const areas = [
    'floor',
    'walls',
    'ceiling',
    'other'
  ];


  return (
    <div className="questions">

    { !data.translations && (<h3>Loading...</h3>)}
    
    {data && data.flooring_step && data.flooring_step.map((item) => { 
      return (
        <div className={"question sqmselect " + (selectedOptions[item.q_id] && selectedOptions[item.q_id]['amount'] > 0 ? 'hasnumbers' : '')} key={item.q_id}>

          <div className="mark">
            <img className="sqm" src={getImageURL('check.svg')} alt="Checked" title="Checked" />
          </div>

          <div className="image" style={{ 
            backgroundImage: `url("${getImageURL(item.q_picture)}")` 
          }}>
            
            <div className="title-holder"><h4>{item.q_text}</h4></div>
          </div>
          
          <div className="sub">

            <div className="row">
              <p>Area size in sq. meters</p>

              <div className="right">
                <NumberPicker defaultValue={0} min={0} step={1} value={ selectedOptions[item.q_id] && selectedOptions[item.q_id]['amount'] > 0 ? selectedOptions[item.q_id]['amount'] : 0 } onChange={value => handleChange('amount', item.q_id, value)} />
              </div>
            </div>

            <div className={selectedOptions[item.q_id] && selectedOptions[item.q_id]['amount'] > 0 ? "subitems active" : 'subitems'}>
              <div className='row spoiler'>
                <div className="title">Area</div>
                <div className="inputs">
                  {areas.map((area) => {
                    return (
                      <input type="radio" name={item.q_id + '_area'} className={item.q_id + '_area'} value={area} onChange={value => handleChange('area', item.q_id, value.target.value)} id={ item.q_id + '_area'} checked={ selectedOptions[item.q_id] && selectedOptions[item.q_id]['area'] === area ? 'checked' : '' }  />
                  )

                  })}
                </div>
              </div>

              <div className='row spoiler' >
                <div className="title">Area Condition</div>
                <div className="inputs noradio">
                  {Object.keys(conditions).map(( condition, key) => {
                    return (
                      <div>
                        
                        <input type="radio" name={item.q_id + '_condition'} className={item.q_id + '_condition'} value={condition} onChange={value => handleChange('condition', item.q_id, value.target.value)} id={item.q_id + '_condition_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['condition'] === condition ? 'checked' : ''} />
                        <label htmlFor={item.q_id + '_condition_' + key}>{conditions[condition]}</label>
                        
                      </div>
                  )

                  })}
                </div>
              </div>
            </div>
 



          </div>
        </div>
      )
    })}

    </div>

    
  )
}

export default Flooring