
import { useEffect, useState } from "react";

function IndexStep({ nextStep, data, step, getImageURL, handleChoices, choices }) {

  const [selected, setSelected] = useState({});

  function handleSelection(qid) {
    setSelected(qid);
    handleChoices( 'service', qid );
  }

  useEffect(() => { 
    //console.log(choices[1]);
   if(choices && choices[1]) setSelected(choices[1]);
  }, []);

  return (
    <div className="questions">

    <div className="side">
                <div className="label">
                    SERVICES
                </div>
            </div>
        
            <div className="inner">

                { !data.translations && (<h3>Loading...</h3>)}
                
                {data && data.index_step && data.index_step.map((item) => { 
                  return (
                    <div className={"question " + (item.q_id == selected ? 'hasnumbers' : '')} key={item.q_id} onClick={() => { handleSelection(item.q_id) }}  >
                      
                      <div className="mark">
                        <img className="sqm" src={getImageURL('check.svg')} alt="Square Meter" title="Square Meter" />
                      </div>

                      <img src={getImageURL(item.q_picture)} alt={item.q_text} title={item.q_text} />
                      <h4>{item.q_text}</h4>
                    </div>
                  )
                })}
            </div>
    </div>
  )
}

export default IndexStep