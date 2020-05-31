import React from 'react';
import 'w3-css/w3.css';
import '../style.css';
import Logo from "./img/logo.png"
import create from "./img/create.png"
import { Link } from 'react-router-dom'
import 'w3-css/w3.css';
import '../style.css';

function Popup () {
  return(
    <div className='popup'>
      <div className='popup_inner'>
        <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
      </div>
    </div>
      )
}

class CreateGame extends React.Component{
    constructor() {
      super();
      this.state = {
      showPopup: false,
      user: "",
      pin_game: ""
      }
    }
    
  render(){ 
    return(
        <div>
          <div className="w3-bar w3-grey">
             <Link to ="/" className="w3-bar-item w3-button w3-grey">
                <img className="w3-bar-item" src={Logo} width="50" height="50"/>
              </Link>
              <Link Link to ="/create-game" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Create Game</Link>
              <Link Link to ="/join-game" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Join Game</Link>
              <a className="w3-bar-item w3-button w3-round w3-right w3-blue w3-section w3-margin-right">
                <a href="https://github.com/SwimmerRafa/BlackJack21" className="button is-info">
                    <i className="w3-xlarge fab fa-github"></i>
                    <strong> Github </strong>
                </a>
              </a>
            </div>
            
            <div style={{backgroundColor: "#857671"}} className="w3-container w3-center">
              
              <div className="w3-container w3-center">
                <h1 className="w3-center"> <strong>Create Game</strong> </h1>
                <img style={{width: "100%" , "max-width": "500px"}} src={create} className="w3-round w3-image" alt="Norway"/>
              </div>
              <br/>
              
              <div className="w3-container  w3-mobile">
                <form style={{backgroundColor: "#e2ded3", width: "50%"}} className="w3-mobile w3-container w3-card-2 w3-margin">
                  <div className="w3-row w3-section">
                    <div className="w3-col" style={{width:"50px"}}><i className="w3-mobile w3-xxlarge fa fa-user"></i></div>
                      <div style={{"max-width":"400px"}} className="w3-rest w3-mobile">
                        <input className="w3-input w3-mobile w3-border" name="first" type="text" placeholder="NickName"/>
                      </div>
                  </div>
                  <div className="w3-row w3-section">
                    <div className="w3-col" style={{width:"50px"}}><i class="w3-mobile w3-xxlarge fas fa-key"></i></div>
                      <div className="w3-rest w3-mobile" style={{"max-width":"400px"}}>
                        <input className="w3-input w3-mobile w3-border" name="Game PIN" type="number" placeholder="Game PIN"/>
                      </div>
                  </div>
                  <div className="w3-center">
                    <button className="w3-button w3-center w3-section w3-blue w3-ripple w3-padding">
                      <i className="w3-xxlarge fas fa-gamepad"></i><br/> Start Game
                    </button>
                  </div>
                </form>
                <br/>
                <br/>
              </div>
            </div>
            
            <div className ="footer2 w3-grey">
              <p>
                <strong>Developed </strong> by 
                <a style={{color: "paleturquoise"}} href="https://www.linkedin.com/in/rafael-moreno-ca%C3%B1as-aba58a1a6/"> Rafael Moreno</a>,
                <a style={{color: "paleturquoise"}} href="#"> Ricardo Velazquez </a> and
                <a style={{color: "paleturquoise"}} href="#"> Eric Gomez</a>
              </p>
            </div>
            
        </div>
        )
  }
}

export default CreateGame