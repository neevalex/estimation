import React, { useState } from 'react';

const App = ({cfError, cfData, setcfData, getTranslation}) => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ address, setMessage ] = useState('')
    const [urgent, setUrgent] = useState('')
    
   

    const cfChangeHandler = (event) => { 
        setcfData({...cfData, [event.target.name]: event.target.value})
    }
    
    
    const options = [ getTranslation('urgent1'), getTranslation('urgent2'), getTranslation('urgent3'), getTranslation('urgent4')];

    const onOptionChangeHandler = (event) => {
        setcfData({...cfData, 'urgent': event.target.value})
    }

    return (
        <div className="step-form">
            {/* <pre><strong>{JSON.stringify(cfData, null, 2)}</strong> </pre> */}
            <h1>{ getTranslation('estimate_ready')}</h1>
            <p className='subtitle'>{ getTranslation('to_complete')}</p>
            <form className="form">
                <div>
                    <label htmlFor="name">{ getTranslation('name')}</label>
                    <input type="text" id="name" name="name" value={cfData && cfData.name ? cfData.name : ''} onChange={e => cfChangeHandler(e)} />
                </div>

                <div>
                    <label htmlFor="email">{ getTranslation('email')}</label>
                    <input type="email" id="email" name="email" value={cfData && cfData.email ? cfData.email : ''} onChange={e => cfChangeHandler(e)} />
                </div>
                    
                <div>
                    <label htmlFor="phone">{ getTranslation('phone')}</label>
                    <input type="text" id="phone" name="phone" value={cfData && cfData.phone ? cfData.phone : ''} onChange={e => cfChangeHandler(e)} />
                </div>
                    
                <div>
                    <label htmlFor="select">{ getTranslation('how_urgent')}</label>
                    <select id="select" value={cfData && cfData.urgent ? cfData.urgent : ''} onChange={onOptionChangeHandler}>

                    <option>Please choose</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                    </select>    
                </div>   

                    

                <div>
                    <label htmlFor="message">{ getTranslation('project_address')}</label>
                    <textarea id="message" name="address" value={cfData && cfData.address ? cfData.address : ''} onChange={e => cfChangeHandler(e)} />
                </div>

                <div className='error'>{ cfError }</div>
                
            </form>
        </div>
    )
}

export default App;