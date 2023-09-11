import { useState, useEffect } from "react";

function Rooms({ getTranslation, data, forceUpdate, getImageURL, handleChoices, choices, rooms }) {

    const [selected, setSelected] = useState([]);

    function handleSelection(qid) {   
        
        if (choices && choices.rooms && choices.rooms[qid] && choices.rooms[qid].length > 0) return;
        let newSelected = choices.rooms;

        if(!newSelected) newSelected = [];

        if (newSelected[qid] !== undefined) {
            delete newSelected[qid];
        } else {
            newSelected[qid] = [];
        }

        //console.log("handleSelection", newSelected);

        setSelected(selected => ({ ...selected ,...newSelected }));
        
    }


    useEffect(() => {
        if (choices && choices.rooms) setSelected(choices.rooms);  
    }, []);


    useEffect(() => {
        handleChoices('rooms', selected); 
    }, [selected]);

    return (
        <div className="questions rooms five">
            <div className="side">
                <div className="label">
                    { getTranslation('rooms') }
                </div>
            </div>
        
            <div className="inner">
            
                {!data.translations && (<h3>{ getTranslation('loading') }</h3>)}
                
                {data && data.rooms_step && data.rooms_step.map((item) => { 

                    if (rooms && Object.values(rooms).indexOf(item.q_id) < 0) return;


                return (
                    <div className={"question " + (selected && selected[item.q_id] ? 'hasnumbers' : '')} key={item.q_id} onClick={() => { handleSelection(item.q_id) }} >

                        {/* {choices && choices.rooms && choices.rooms[item.q_id] && choices.rooms[item.q_id].length > 0 && (
                        <div className="selectedroom">
                            {choices.rooms[item.q_id]}
                        </div>)}
                     */}
                        
                        <div className="mark">
                            <img className="sqm" src={getImageURL('check.svg')} alt={ item.q_text } title={ item.q_text } />
                        </div>
                        
                        <div className="image" style={{ 
                        backgroundImage: `url("${getImageURL(item.q_picture)}")` 
                        }}>
                        
                        <div className="title-holder"><h4>{item.q_text}</h4></div>
                        </div>

                    </div>
                )
                })}
            </div>
        </div>
    )
    


}

export default Rooms