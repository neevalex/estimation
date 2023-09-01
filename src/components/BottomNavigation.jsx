
function BottomNavigation({ getTranslation, state, step, nextStep, prevStep } ) {
    return (
      <div className="bottom-navigation">
        <div className="inner">
  
          <div className="control">
  
            {process.env.REACT_APP_ENVIRONMENT === 'development' && (<div className={"button " + (state.prevButtonState ? '' : 'disabled')} onClick={() => { prevStep(state.prevButtonState) }}>
              Go back
            </div>)} 
            
              <div className={"button " + (state.nextButtonState ? '' : 'disabled')} onClick={() => { nextStep(state.nextButtonState) } } >
              { getTranslation('proceed') }
              </div>
            
          </div>
  
  
        </div>
      </div>
    )
  }
  
  export default BottomNavigation