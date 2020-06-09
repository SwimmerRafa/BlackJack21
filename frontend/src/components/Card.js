import React, {Component} from 'react';
import 'w3-css/w3.css';

class Card extends Component {

    render() {
        const {mazo, carta} = this.props

        let palo = ""
        switch (mazo) {
            case "Corazones":
                palo = "♥"
                break
            case "Espadas":
                palo = "♠"
                break
            case "Treboles":
                palo = "♣"
                break
            case "Diamantes":
                palo = "♦"
                break
        }

        return (
            <div className="w3-mpbile w3-card-4 width-10 margin-rigth">
                <div className="w3-mobile w3-container w3-white w3-left card-border">
                    <h1 className="w3-mobile w3-left">{palo}</h1>
                </div>

                <div  className="w3-mobile w3-container w3-white w3-center">
                    <h1>{carta}</h1>
                </div>

                <div className="w3-mobile w3-container w3-white card-border">
                    <h1 className="w3-right">{palo}</h1>
                </div>
            </div>
        )
    }
}

export default Card