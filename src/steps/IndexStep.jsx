

function IndexStep({ nextStep, data, getImageURL }) {
  return (
    <div className="questions">

    { !data.translations && (<h3>Loading...</h3>)}
    
    {data && data.index_step && data.index_step.map((item) => { 
      return (
        <div className="question" key={item.q_id} onClick={() => { nextStep() } }  >
          <img src={getImageURL(item.q_picture)} alt={item.q_text} title={item.q_text} />
          <h4>{item.q_text}</h4>
        </div>
      )
    })}

    </div>
  )
}

export default IndexStep