import { useEffect, useState } from "react";
import NumberPicker from "react-widgets/NumberPicker";
import Tippy from '@tippyjs/react';
import SubQuestion from "./elements/SubQuestion";


function Questions({ getTranslation, data, getImageURL, selectedOptions, handleChange, deletehandleChange, choices, handleChoices, hasFreeRooms, dataSource, subItems }) {

    const conditions = {
        'removeoldcoatingyes':  getTranslation('yes'),
        'removeoldcoatingno' : getTranslation('no'),
      };

    const wallsneedpreparation = {
        'wallsneedpreparationyes': 'Yes',
        'wallsneedpreparationno': getTranslation('no'),
    };

    const removewallcovering = {
        'removewallcoveringyes': getTranslation('yes'),
        'removewallcoveringnno': getTranslation('no'),
    };

    const furniture = {
        'furnitureyes': getTranslation('yes'),
        'furnitureno': getTranslation('no'),
    };

    const regreage = {
        'regreageyes': getTranslation('yes'),
        'regreageno' : getTranslation('no'),
    };
    
    const skirtingboards = {
        'skirtingboardsyes': getTranslation('yes'),
        'skirtingboardsno' : getTranslation('no'),
    };

    const flooring = {
        'flooringyes': getTranslation('yes'),
        'flooringno' : getTranslation('no'),
    };

    const wallcovering = {
        'wallcoveringyes': getTranslation('yes'),
        'wallcoveringno' : getTranslation('no'),
    };

    const painting = {
        'paintingyes': getTranslation('yes'),
        'paintingno' : getTranslation('no'),
    };

    const plastering = {
        'plasteringyes': getTranslation('yes'),
        'plasteringno' : getTranslation('no'),
    };

    const  electricity = {
        'electricityyes': getTranslation('yes'),
        'electricityno' : getTranslation('no'),
    };

    const  kitchenhastobemounted = {
        'kitchenhastobemountedyes': getTranslation('yes'),
        'kitchenhastobemountedno' : getTranslation('no'),
    };

    const  removeoldkitchen = {
        'removeoldkitchenyes': getTranslation('yes'),
        'removeoldkitchenno' : getTranslation(getTranslation('no')),
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
            handleChoices('servicerooms', newSelected);
        }

        if (!servicesPool.length && data && dataSource) {
            let pool = [];
            dataSource.map((item) => {
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
        //console.log(nr);
        setSelectionToggle(nr);
        handleChoices('servicerooms', choices.servicerooms);
    }

    const setRoomservice = (id, room, sp_index, force_size = null) => {

        let newChoices = choices;
        if (!newChoices.rooms) newChoices.rooms = [];
        if (!newChoices.rooms[room]) newChoices.rooms[room] = [];
        newChoices.rooms[room].push(id);
        handleChoices(newChoices);

        data['rooms_step'].map((sdata) => {

            if (sdata.q_id === room) {
                if (sdata.default_size) {

                    if (force_size) {
                        handleChange('price_per_m', id, Number(force_size), sp_index)
                    }
                    else {
                        handleChange('price_per_m', id, Number(sdata.default_size), sp_index);
                    }
                    
                    let sp = servicesPool;
                    sp.push(id)
                    setServicesPool(sp);
                    //console.log(servicesPool);
                    handleChoices('servicespool', servicesPool);
                }
            }
            return true;

        });

    }

    const removeRoomservice = (id, room, sp_index, force_size = null) => { 
            
            let newChoices = choices;
            if (!newChoices.rooms) newChoices.rooms = [];
            if (!newChoices.rooms[room]) newChoices.rooms[room] = [];
            let index = newChoices.rooms[room].indexOf(id);
            if (index > -1) {
                newChoices.rooms[room].splice(index, 1);
            }
            handleChoices(newChoices);
    
            data['rooms_step'].map((sdata) => {
    
                if (sdata.q_id === room) {
                    if (sdata.default_size) {
                        handleChange('price_per_m', id, Number(sdata.default_size), sp_index);
                        let sp = servicesPool;
                        let index = sp.indexOf(id);
                        if (index > -1) {
                            sp.splice(index, 1);
                        }
                        setServicesPool(sp);
                        handleChoices('servicespool', servicesPool);
                    }
                }
                return true;
    
            });
        
            let newSelected = choices.servicerooms;
        
            let ind = newSelected[id].indexOf(room);
            if (ind !== -1) {
                newSelected[id].splice(index, 1);
            }
        
            if(Object.keys( newSelected[id] ).length < 1) delete newSelected[id];

        handleChoices('servicerooms', newSelected);
        
        deletehandleChange(id, sp_index);

        let nr = selectiontoggle;
        nr[id][index] = !selectiontoggle[id][index];
        //console.log(nr);
        setSelectionToggle(nr);
    
    }

    const isVisible = (optionsArray, itemId) => { 
       
        let dataStepName = choices.service + '_step';  //flooring
        if (!data[dataStepName]) return false;
        let result = false;

        data[dataStepName].map((data_item, datakey) => { 
            if (data_item.q_id === itemId) { 
                
                if (data_item[Object.keys(optionsArray)[0]] > 0) {
                   // console.log(Object.keys(optionsArray)[0]);
                    result =  true;
                }
            }
        });

        return result;
    };



    return (

        <div className="questions">

            <div className="side">
                <div className="label">
                    { getTranslation('services') }
                </div>
            </div>
            {/* <pre>{JSON.stringify(selectedRooms, null, 2)}</pre> */}
            <div className="inner">
                {!data.translations && (<h3>{getTranslation('loading')}</h3>)}

                {data && servicesPool && dataSource.map((item) => {

                    let sp_index_size = servicesPool.filter(x => x === item.q_id).length;
                    let output = [];

                    for (let sp_index = 0; sp_index < sp_index_size; sp_index++) {
                        output[sp_index] = (
                            <div key={'q_' + sp_index + '_' + item.q_id} id={'q_' + sp_index + '_' + item.q_id} className={"question sqmselect " + (selectedOptions[item.q_id] && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] != null ? 'hasnumbers hasroom' : '') + (selectiontoggle && selectiontoggle[item.q_id] && selectiontoggle[item.q_id][sp_index] ? ' hasselectionprocess' : '')}  >
                                <div className="message">
                                    {hasFreeRooms && (<>{getTranslation('please1')}</>)}
                                    {!hasFreeRooms && (<>{getTranslation('please2')}</>)}
                                </div>

                                <div className="mark">
                                    <img className="sqm" src={getImageURL('check.svg')} alt="Checked" title="Checked" />

                                    {choices && choices.servicerooms && choices.servicerooms[item.q_id] && choices.servicerooms[item.q_id][sp_index] && (<img className="close" src={getImageURL('close.svg')} alt="Close" title="Close" onClick={() => { removeRoomservice(item.q_id, choices.servicerooms[item.q_id][sp_index], sp_index, item.force_size); }} /> )}


                                </div>

                                {choices && choices.servicerooms && choices.servicerooms[item.q_id] && (
                                    <div className="selectedroom">
                                        {getTranslation( choices.servicerooms[item.q_id][sp_index])}
                                    </div>)}

                                <div className="roomselector">
                                    <div className="title">
                                    { getTranslation('which_room') } {item.q_text}
                                    </div>


                                    {choices && choices.rooms && (
                                        <div className="rooms">

                                            {Object.keys(choices.rooms).map((room, key) => {
                                                if (choices.servicerooms && Object.values(choices.servicerooms).indexOf(room) > -1) return;
                                                return (
                                                    <div className="room" onClick={() => { setSelectedRooms({ 'id': item.q_id, 'room': room, 'index': sp_index }); setRoomservice(item.q_id, room, sp_index, item.force_size); }}>{getTranslation(room)}</div>
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
                                        <p>
                                            {item.custom_service_name ? item.custom_service_name : getTranslation('area_size_sqm')}
                                            {item.tip && (<Tippy content={ item.tip }>
                                                <button className="tip">?</button>
                                            </Tippy>)}
                                        </p>

                                        <div className="right">
                                            <img className={item.custom_service_icon ? 'sqm small':'sqm'} src={item.custom_service_icon ? getImageURL(item.custom_service_icon) : getImageURL('sqmeter.png')} alt={ getTranslation('sq_meter')} title={ getTranslation('sq_meter')} />

                                            <NumberPicker min={0} step={1} value={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] > 0 ? selectedOptions[item.q_id][sp_index]['price_per_m'] : 0} onChange={value => handleChange('price_per_m', item.q_id, value, sp_index)} />

                                        </div>
                                    </div>

                                    <div className={selectedOptions[item.q_id] && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['price_per_m'] > 0 ? "subitems active" : 'subitems'}>
                                    
                                        {subItems && Object.values(subItems).indexOf('removeoldcoating') > -1 && (<SubQuestion subData={conditions} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('remove_old_coating')} tipText={ getTranslation('remove_old_coating_tip')} icon="crowbar.svg" keyword="removeoldcoating" />)}

                                        {subItems && Object.values(subItems).indexOf('regreage') > -1 && selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index]['removeoldcoating'] === 'removeoldcoatingyes' && (

                                        <SubQuestion subData={regreage} sp_index={sp_index} item={ item } handleChange={ handleChange } selectedOptions={ selectedOptions } getImageURL={getImageURL} text={ getTranslation('regreage')} tipText={ getTranslation('regreage_tip')} icon="level.svg" keyword="regreage" />

                                        )}

                                        {subItems && isVisible(flooring, item.q_id) && Object.values(subItems).indexOf('flooring') > -1 && (<SubQuestion subData={flooring} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('flooring')} tipText={ getTranslation('flooring_tip')} icon="board-wood.svg" keyword="flooring" />)}

                                        {subItems && isVisible(wallcovering, item.q_id) && Object.values(subItems).indexOf('wallcovering') > -1 && (<SubQuestion subData={wallcovering} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('wall_covering')} tipText={ getTranslation('wall_covering_tip')} icon="wall.svg" keyword="wallcovering" />)}


                                        {subItems && isVisible(painting, item.q_id) && Object.values(subItems).indexOf('painting') > -1 && (<SubQuestion subData={painting} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('painting')} tipText={ getTranslation('painting_tip')} icon="paint-roll.svg" keyword="painting" />)}


                                        {subItems && isVisible(plastering, item.q_id) && Object.values(subItems).indexOf('plastering') > -1 && (<SubQuestion subData={plastering} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('plastering')} tipText={ getTranslation('plastering_tip')} icon="trowel.svg" keyword="plastering" />)}


                                        {subItems && isVisible(electricity, item.q_id) && Object.values(subItems).indexOf('electricity') > -1 && (<SubQuestion subData={electricity} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('electricity')} tipText={ getTranslation('electricity_tip')} icon="plug-fill.svg" keyword="electricity" />)}

                                        {subItems && Object.values(subItems).indexOf('removeoldkitchen') > -1 && (<SubQuestion subData={removeoldkitchen} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('r_old_kitchen')} tipText={ getTranslation('r_old_kitchen_tip')} icon="crowbar.svg" keyword="removeoldkitchen" />)}

                                        {subItems && Object.values(subItems).indexOf('kitchenhastobemounted') > -1 && (<SubQuestion subData={kitchenhastobemounted} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('kitchen_mount')} tipText={ getTranslation('kitchen_mount_tip')} icon="mount.svg" keyword="kitchenhastobemounted" />)}


                                        {subItems && Object.values(subItems).indexOf('skirtingboards') > -1 && (<SubQuestion subData={skirtingboards} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('skirting_boards')} tipText={ getTranslation('skirting_boards_tip')} icon="board-wood.svg" keyword="skirtingboards" />)}
                                        
                                        {subItems && Object.values(subItems).indexOf('wallsneedpreparation') > -1 && (<SubQuestion subData={wallsneedpreparation} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('walls_need_prep')} tipText={ getTranslation('walls_need_prep_tip')} icon="wall.svg" keyword="wallsneedpreparation" />)}

                                        {subItems && Object.values(subItems).indexOf('removewallcovering') > -1 && (<SubQuestion subData={removewallcovering} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('remove_wallpapers')} tipText={ getTranslation('remove_wallpapers_tip')} icon="cut.svg" keyword="removewallcovering" />)}

                                        {subItems && Object.values(subItems).indexOf('furniture') > -1 && (<SubQuestion subData={furniture} sp_index={sp_index} item={item} handleChange={handleChange} selectedOptions={selectedOptions} getImageURL={getImageURL} text={ getTranslation('supply_furniture')} tipText={ getTranslation('supply_furniture_tip')} icon="furniture.svg" keyword="furniture" />)}

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

export default Questions