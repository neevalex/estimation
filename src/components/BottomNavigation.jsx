
function BottomNavigation({ state, step, nextStep, prevStep } ) {
    return (
      <div className="bottom-navigation">
        <div className="inner">
  
          <div className="control">
  
              {/* <div className={"button " + (state.prevButtonState ? '' : 'disabled')} onClick={() => { prevStep(state.prevButtonState) } }>
                Go back
              </div> */}
            
              <div className={"button " + (state.nextButtonState ? '' : 'disabled')} onClick={() => { nextStep(state.nextButtonState) } } >
               Proceed
              </div>
            
          </div>
  
  
        </div>
      </div>
    )
  }
  
  export default BottomNavigation