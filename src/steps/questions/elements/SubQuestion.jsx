import Tippy from '@tippyjs/react';

function SubQuestion({ subData, sp_index, item, handleChange, selectedOptions, getImageURL, text, tipText, icon, keyword }) {

    return (
        <div className='row spoiler'>
            <div className="title">{ text }
                <Tippy content={ tipText }>
                    <button className="tip">?</button>
                 </Tippy>
            </div>
            <div className="inputs noradio">
                <img className="smallicon" src={ getImageURL(icon) } alt={ text } title={ text } />
                {Object.keys(subData).map((condition, key) => {
                    return (
                            <div key={item.q_id + '_' + sp_index + '_'+keyword+'_radio_' + key} >
                                <input type="radio" name={item.q_id + '_' + sp_index + '_'+keyword} className={item.q_id + '_'+keyword} value={condition} onChange={value => handleChange(keyword, item.q_id, value.target.value, sp_index)} id={item.q_id + '_' + sp_index + '_'+keyword+'_' + key} checked={selectedOptions[item.q_id][sp_index] && selectedOptions[item.q_id][sp_index][keyword] === condition ? 'checked' : ''} />
                                <label htmlFor={item.q_id + '_' + sp_index + '_'+keyword+'_' + key}>{subData[condition]}</label>
                            </div>
                    )
            })}
            </div>
        </div>
    )
    


}

export default SubQuestion