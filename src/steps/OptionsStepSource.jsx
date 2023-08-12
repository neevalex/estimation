import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";

function OptionsStep({ nextStep, data, step, getImageURL, handleSelectedOptions, selectedOptions }) {

  const [options, setOptions] = useState({});

  const handleChange = (type, q_id, value) => {
    let v = {
      ...options,
    };

    if (!v.hasOwnProperty(q_id))  v[q_id] = {};
    //if (!v[q_id][type]) v[q_id][type] = {};
    v[q_id][type] = value;
    console.log(v);
    setOptions({...options, ...v} );
    handleSelectedOptions(options);
  }

  const conditions = [
    'good',
    'normal',
    'bad',
    'hard_to_tell'
  ];

  const areas = [
    'floor',
    'walls',
    'ceiling',
    'other'
  ];

 
  useEffect(() => { 
    setOptions( selectedOptions );
  }, []);


  return (
    <div className="questions">

    { !data.translations && (<h3>Loading...</h3>)}
    
    {data && data.options_step && data.options_step.map((item) => { 
      return (
        <div className={"question sqmselect " + (selectedOptions[item.q_id] && selectedOptions[item.q_id]['amount'] > 0 ? 'hasnumbers' : '')} key={item.q_id}>

          <div className="mark">
            <img className="sqm" src={getImageURL('check.svg')} alt="Checked" title="Checked" />
          </div>

          <div className="image">
            <img src={getImageURL(item.q_picture)} alt={item.q_text} title={item.q_text} />
            <div className="title-holder"><h4>{item.q_text}</h4></div>
          </div>
          
          <div className="sub">

            <div className="row">
              <p>Amount</p>

              <div className="right">
                <NumberPicker defaultValue={0} min={0} step={1} value={ options[item.q_id] && options[item.q_id]['amount'] > 0 ? options[item.q_id]['amount'] : 0 } onChange={value => handleChange('amount', item.q_id, value)} />
              </div>
            </div>

            <div className={options[item.q_id] && options[item.q_id]['amount'] > 0 ? "subitems active" : 'subitems'}>
              <div className='row spoiler'>
                <div className="title">Area</div>
                <div className="inputs">
                  {areas.map((area) => {
                    return (
                      <input type="radio" name={item.q_id + '_area'} className={item.q_id + '_area'} value={area} onChange={value => handleChange('area', item.q_id, value.target.value)} id={ item.q_id + '_area'} checked={ options[item.q_id] && options[item.q_id]['area'] === area ? 'checked' : '' }  />
                  )

                  })}
                </div>
              </div>

              <div className='row spoiler' >
                <div className="title">Area Condition</div>
                <div className="inputs">
                  {conditions.map((condition) => {
                    return (
                      <input type="radio" name={item.q_id + '_condition'} className={item.q_id + '_condition'} value={condition} onChange={value => handleChange('condition', item.q_id, value.target.value)} id={ item.q_id + '_condition'} checked={ options[item.q_id] && options[item.q_id]['condition'] === condition ? 'checked' : '' }  />
                  )

                  })}
                </div>
              </div>
            </div>
 



          </div>
        </div>
      )
    })}
    {/* <pre>{JSON.stringify(options, null, 2)}</pre> */}
    </div>

    
  )
}

export default OptionsStep