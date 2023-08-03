import React, { useState } from 'react';

const App = () => {

    const [ name, setName ] = useState('')
    const [email, setEmail] = useState('')
    const [ phone, setPhone ] = useState('')
    const [message, setMessage] = useState('')
    
    const options = ['In a week', 'In a month', 'This year', 'Hard to tell'];
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(name, email, message)
    }

    return (
        <div className="step-form">
            <h1>Your estimate is ready!</h1>
            <p className='subtitle'>To complete and discover your estimate, please fill in the information below.</p>
            <form className="form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                    
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                </div>
                    
                <div>
                    <label htmlFor="select">How urgently?</label>
                    <select id="select" onChange={onOptionChangeHandler}>

                    <option>Please choose</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                    </select>    
                </div>   

                    

                <div>
                    <label htmlFor="message">Project Address</label>
                    <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)}/>
                </div>
                

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default App;