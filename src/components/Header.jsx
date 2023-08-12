function Header({ setStep }) {
    return (
        <header>
            <div className="inner">
                <div className="logo">
                    <a href="https://www.entreprisebelair.com/">
                        <img src="/assets/img/logo.svg" alt="Belair" />
                    </a>
                </div>
                <div className="buttons">
                    <a href="#" onClick={() => { setStep(1) }} >
                        <img src="/assets/img/reload.svg" alt="Call us" />
                    </a>
                    <a href="tel:12345">
                        <img src="/assets/img/phone.svg" alt="Call us" />
                    </a>
                    <a href="https://www.entreprisebelair.com/">
                        <img src="/assets/img/close.svg" alt="Close" />
                    </a>
                </div>
            </div>
           
        </header>
    )
  }
  
  export default Header