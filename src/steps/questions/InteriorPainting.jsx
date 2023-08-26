import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";
import Tippy from '@tippyjs/react';
import SubQuestion from "./elements/SubQuestion";


function InteriorPainting({ data, getImageURL, selectedOptions, handleChange, choices, handleChoices, hasFreeRooms }) {

    const wallsneedpreparation = {
        'wallsneedpreparationyes': 'Yes',
        'wallsneedpreparationno': 'No',
    };

    const removewallcovering = {
        'removewallcoveringyes': 'Yes',
        'removewallcoveringnno': 'No',
    };

    const furniture = {
        'furnitureyes': 'Yes',
        'furnitureno': 'No',
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
            //console.log(selectedRooms.room);

            handleChoices('servicerooms', newSelected);
        }

        if (!servicesPool.length && data && data.interiorpainting_step) {
            let pool = [];
            data.interiorpainting_step.map((item) => {
                return pool.push(item.q_id);
            });
            setServicesPool(pool);
        }

        if (choices.servicesPool) setServicesPool(servicesPool => ({ ...servicesPool, ...choices.servicesPool }));


    }, [selectedRooms, selectiontoggle]);



    const selectServiceRoom = async (id, index) => {

        if (!hasFreeRooms) return;
        //console.log('togg');
        let nr = selectiontoggle;

        if (!nr) nr = {};
        if (!nr[id]) nr[id] = [];
        if (!nr[id][index]) nr[id][index] = false;

        nr[id][index] = !selectiontoggle[id][index];
        console.log(nr);
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
                if (sdata.default_size) {
                    // console.log(sdata.default_size);
                    // handleChange('room', id, room, sp_index);
                    handleChange('price_per_m', id, Number(sdata.default_size), sp_index);
                    let sp = servicesPool;
                    sp.push(id)
                    setServicesPool(sp);
                    console.log(servicesPool);
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

                {data && data.interiorpainting_step && servicesPool && data.interiorpainting_step.map((item) => {


                    let sp_index_size = servicesPool.filter(x => x === item.q_id).length;
                    let output = [];

                    for (let sp_index = 0; sp_index < sp_index_size; sp_index++) {
                        output[sp_index] = (
                            <div key={'q_' + sp_index + '_' + item.q_id} id={'q_' + sp_index + '_' + item.q_id} className={"question sqmselect " + (selectedOptions[item.q_id] && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] != null ? 'hasnumbers hasroom' : '') + (selectiontoggle && selectiontoggle[item.q_id] && selectiontoggle[item.q_id][sp_index] ? ' hasselectionprocess' : '')}  >
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

                                    <div className="title-holder"><h4>{item.q_text} {((sp_index > 0) && !(selectedOptions[item.q_id] && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'])) > 0 ? '+' : ''}</h4></div>
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
                                        
                                        <SubQuestion subData={wallsneedpreparation} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text="Walls need preparation" tipText="Walls need preparation" icon="wall.svg" keyword="wallsneedpreparation" />

                                        <SubQuestion subData={removewallcovering} sp_index={sp_index} item={ item } handleChange={ handleChange } selectedOptions={ selectedOptions } getImageURL={getImageURL} text="Remove old wallpapers" tipText="Remove old wallpapers" icon="cut.svg" keyword="removewallcovering" />

                                        <SubQuestion subData={furniture} sp_index={sp_index} item={ item } handleChange={ handleChange } selectedOptions={ selectedOptions } getImageURL={getImageURL} text="Supply furniture" tipText="Furniture text here" icon="furniture.svg" keyword="furniture" />

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

export default InteriorPainting