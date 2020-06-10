import React from 'react';
import 'w3-css/w3.css';
import axios from 'axios';
import Logo from "./img/logo.png"
import create from "./img/create.png"
import {Link} from 'react-router-dom'
import { hostnames } from '../config/hosts'

class JoinGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            pin_game: ""
        }
    }

    unirseJuego = (e) => {
        e.preventDefault();
        const {user, pin_game} = this.state
        axios.post(`http://${hostnames.awsip}/juego/unirse-juego` ,{'nombre': user, "idJuego": pin_game}).then((res) => {
            console.log(res.data)
            this.props.setGameProps(res.data);
            console.log(this.props);
            this.props.history.push("/game");
        }).catch((e) => {
            console.log(e)
        })
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const {user, pin_game} = this.state

        let buttonClass = (user === "" || pin_game === "") ? 'w3-disabled' : ''

        return (
            <div>
                <div className="w3-bar w3-grey">
                    <Link to="/" className="w3-bar-item w3-button w3-grey">
                        <img className="w3-bar-item" src={Logo} width="50" height="50" alt="logo"/>
                    </Link>
                    <Link Link to="/create-game" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Create Game</Link>
                    <Link Link to="/join-game" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Join Game</Link>
                    <button className="w3-bar-item w3-button w3-round w3-right w3-blue w3-section w3-margin-right">
                        <a href="https://github.com/SwimmerRafa/BlackJack21" className="button is-info">
                            <i className="w3-xlarge fab fa-github"/>
                            <strong> Github </strong>
                        </a>
                    </button>
                </div>

                <div className="w3-container w3-blue-gray">
                    <h1 className="w3-center"><strong>Join Game</strong></h1>
                </div>

                <div className="w3-container w3-center w3-margin">
                    <img style={{width: "100%", "max-width": "500px"}} src={create} className="w3-round  w3-image" alt="Norway"/>
                </div>

                <div className="w3-container">
                    <form className="w3-container w3-margin">

                        <label className="w3-text-blue-grey"><b>Nickname</b></label>
                        <input className="w3-margin-bottom w3-input w3-border w3-light-grey" onChange={this.inputHandler} name="user" value={user}
                               type="text" required/>

                        <label className="w3-text-blue-grey"><b>Game Pin</b></label>
                        <input className=" w3-margin-bottom w3-input w3-border w3-light-grey" onChange={this.inputHandler} name="pin_game"
                               value={pin_game} type="number" required/>

                        <div className="w3-center">
                            <button onClick={this.unirseJuego} class={`w3-btn w3-center w3-teal ${buttonClass}`}><a>JOIN</a></button>
                        </div>
                    </form>
                </div>

                <div className="footer2 w3-grey">
                    <p>
                        <strong>Developed </strong> by
                        <a style={{color: "paleturquoise"}} href="https://www.linkedin.com/in/rafael-moreno-ca%C3%B1as-aba58a1a6/"> Rafael Moreno</a>,
                        <a style={{color: "paleturquoise"}} href="https://www.linkedin.com"> Ricardo Velazquez </a> and
                        <a style={{color: "paleturquoise"}} href="https://www.linkedin.com"> Eric Gomez</a>
                    </p>
                </div>

            </div>
        )
    }
}

export default JoinGame