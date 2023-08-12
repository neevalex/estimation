import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";


function Flooring({ data, getImageURL, selectedOptions, handleChange }) {

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
        <div className={"question sqmselect " + (selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? 'hasnumbers' : '')} key={item.q_id}>

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
                <img className="sqm" src={getImageURL('sqmeter.png')} alt="sq. meters" title="sq. meters" />
                <NumberPicker defaultValue={0} min={0} step={1} value={ selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? selectedOptions[item.q_id]['price_per_m'] : 0 } onChange={value => handleChange('price_per_m', item.q_id, value)} />
              </div>
            </div>

            <div className={selectedOptions[item.q_id] && selectedOptions[item.q_id]['price_per_m'] > 0 ? "subitems active" : 'subitems'}>

              <div className='row spoiler' >
                <div className="title">Remove old coating?</div>
                <div className="inputs noradio">
                  <img className="smallicon" src={getImageURL('crowbar.svg')} alt="Remove old coating?" title="Remove old coating?" />
                  {Object.keys(conditions).map(( condition, key) => {
                    return (
                      <div>
                        <input type="radio" name={item.q_id + '_removeoldcoating'} className={item.q_id + '_removeoldcoating'} value={condition} onChange={value => handleChange('removeoldcoating', item.q_id, value.target.value)} id={item.q_id + '_removeoldcoating_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['removeoldcoating'] === condition ? 'checked' : ''} />
                        <label htmlFor={item.q_id + '_removeoldcoating_' + key}>{conditions[condition]}</label>
                      </div>
                  )
                  })}
                </div>
              </div>

              {selectedOptions[item.q_id] && selectedOptions[item.q_id]['removeoldcoating'] === 'removeoldcoatingyes' && (
                <div className='row spoiler'>
                  <div className="title">Regreage needed?</div>
                  <div className="inputs noradio">
                  <img className="smallicon" src={getImageURL('level.svg')} alt="Regreage needed?" title="Regreage needed?" />
                    {Object.keys(regreage).map((condition, key) => {
                      return (
                        <div>
                          <input type="radio" name={item.q_id + '_regreage'} className={item.q_id + '_regreage'} value={condition} onChange={value => handleChange('regreage', item.q_id, value.target.value)} id={item.q_id + '_regreage_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['regreage'] === condition ? 'checked' : ''} />
                          <label htmlFor={item.q_id + '_regreage_' + key}>{regreage[condition]}</label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}


              <div className='row spoiler' >
                <div className="title">Skirting boards?</div>
                <div className="inputs noradio">
                  <img className="smallicon" src={getImageURL('board-wood.svg')} alt="Skirting boards" title="Skirting boards" />
                  {Object.keys(skirtingboards).map(( condition, key) => {
                    return (
                      <div>
                        <input type="radio" name={item.q_id + '_skirtingboards'} className={item.q_id + '_skirtingboards'} value={condition} onChange={value => handleChange('skirtingboards', item.q_id, value.target.value)} id={item.q_id + '_skirtingboards_' + key} checked={selectedOptions[item.q_id] && selectedOptions[item.q_id]['skirtingboards'] === condition ? 'checked' : ''} />
                        <label htmlFor={item.q_id + '_skirtingboards_' + key}>{skirtingboards[condition]}</label>
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