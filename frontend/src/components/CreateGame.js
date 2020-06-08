import React from 'react';
import 'w3-css/w3.css';
import axios from 'axios';
import Logo from "./img/logo.png"
import create from "./img/create.png"
import { Link } from 'react-router-dom'
import 'w3-css/w3.css';

class CreateGame extends React.Component{
  constructor() {
    super();
    this.state = {
    user: ""
    }
  }
  
  crearJuego=()=>{
     const {user} = this.state
    axios({
      method: 'post',
      url: 'http://13.59.95.229:8081/juego/crear-juego',
      data: {'nombre' : user},
      headers: {'Content-Type': 'application/json' }})
      .then(
        res => {
          console.log(res.data)
        }
        )
        .catch(e=>{
          console.log(e)
        })
  }
  
  inputHandler=(event)=>{
    this.setState({[event.target.name]: event.target.value})
    
  }

  render(){
    const {user} = this.state
    let buttonClass = (user === "" ) ? 'w3-disabled' : ''
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
            
            <div className="w3-container w3-blue-gray">
              <h1 className="w3-center"><strong>Create Game</strong></h1>
            </div>
            
            <div className = "w3-container w3-center w3-margin">
              <img style={{width: "100%" , "max-width": "500px"}} src={create} className="w3-round  w3-image" alt="Norway"/>
            </div>
            
            <div className="w3-container">
              <form class="w3-container w3-margin">
                
                <label class="w3-text-blue-grey"><b>Nickname</b></label>
                <input class="w3-margin-bottom w3-input w3-border w3-light-grey" onChange={this.inputHandler} name="user" value={user} type="text" required/>
  
                <div className="w3-center">
                  <Link to="/game" onClick={this.crearJuego} class={`w3-btn w3-center w3-teal ${buttonClass}`}><h5>JOIN</h5></Link>
                </div>
              </form>
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