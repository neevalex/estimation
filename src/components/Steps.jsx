
function Steps({ step, nextStep, prevStep } ) {
  return (
    <div className="steps">
      <div className="inner">

        <div className="control">

            <div className="arrow prev" onClick={() => { prevStep() } }>
              <img src="/assets/img/arrow.svg" alt="back" />
            </div>
          
            <div className="numsteps">
            
              <div className={"centre_block " + (step == 1 ? 'selected' : '')} >
                <div className="centre_icon_wrap">
                  <p className="span-bleu-small">1</p>
                </div>
              </div>

              <div className={"centre_block " + (step == 2 ? 'selected' : '')}>
                <div className="centre_icon_wrap">
                  <p className="span-bleu-small">2</p>
                </div>
              </div>

              <div className={"centre_block " + (step == 3 ? 'selected' : '')}>
                <div className="centre_icon_wrap">
                  <p className="span-bleu-small">3</p>
                </div>
              </div>
            </div>

          <div className="arrow next" onClick={() => { nextStep() } } >
              <img src="/assets/img/arrow.svg" alt="back" />
            </div>
          
        </div>


      </div>
    </div>
  )
}

export default Steps