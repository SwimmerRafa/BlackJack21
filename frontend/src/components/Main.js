import React from 'react';
import Logo from "./img/logo.png"
import baraja from "./img/baraja.png"
import start from "./img/juego.jpg"
import 'w3-css/w3.css';
import '../style.css';
import { Link } from 'react-router-dom'

function Main() {
    return (
          <div>
            <div className="w3-bar w3-grey">
              <img className="w3-bar-item" src={Logo} width="50" height="75"/>
              <Link to ="/" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Home</Link>
              <Link Link to ="/create-game" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Create Game</Link>
              <Link Link to ="/join-game" className="w3-section w3-bar-item w3-button w3-mobile w3-grey">Join Game</Link>
              <a className="w3-bar-item w3-button w3-round w3-right w3-blue w3-section w3-margin-right">
                <a href="https://github.com/SwimmerRafa/BlackJack21" className="button is-info">
                    <i className="fab fa-github"></i>
                    <strong> Github </strong>
                </a>
              </a>
            </div>
            
            <div className="w3-container w3-white">
              <div className="w3-container w3-center">
                <h1><strong>21 Blackjack</strong> </h1>
                <img style={{width: "50%" , "max-width": "300px"}} src={start} className="w3-round w3-image" alt="Norway"/>
              </div>
              
              <div className="w3-container w3-left">
                <h3><strong>Game Rules</strong></h3>
                <p>
                  Players are each dealt two cards, face up or down depending on the casino and the table. The dealer is also dealt two cards, 
                  normally one up (exposed) and one down (hidden). The value of cards two through ten is their pip value (2 through 10). Face cards (Jack, Queen, and King) 
                  are all worth ten. Aces can be worth one or eleven. 
                  A hand's value is the sum of the card values. Players are allowed to draw additional cards to improve their hands. A hand with an ace valued as 
                  11 is called "soft", meaning that the hand will not bust by taking an additional card. The value of the ace will become one to prevent the hand 
                  from exceeding 21. Otherwise, the hand is called "hard".
                </p>
                <p>
                  Once all the players have completed their hands, it is the dealer's turn. The dealer hand will not be completed if all players have either 
                  busted or received blackjacks. The dealer then reveals the hidden card and must hit until the cards total up to 17 points. At 17 points or higher 
                  the dealer must stay. 
                  You are betting that you have a better hand than the dealer. The better hand is the hand where the sum of the card values is closer to 21 without 
                  exceeding 21. The detailed outcome of the hand follows:
                </p>
                <ul>
                  <li>If the player is dealt an Ace and a ten-value card (called a "blackjack" or "natural"), and the dealer does not, the player wins and usually receives a bonus.</li>
                  <li>If the player exceeds a sum of 21 ("busts"); the player loses, even if the dealer also exceeds 21.</li>
                  <li>If the dealer exceeds 21 ("busts") and the player does not; the player wins.</li>
                  <li>If the player attains a final sum higher than the dealer and does not bust; the player wins.</li>
                  <li>If both dealer and player receive a blackjack or any other hands with the same sum, called a "push", no one wins.</li>
                </ul>
              </div>
              
              <div className="w3-container">
                <h3><strong>Player Decisions</strong></h3>
                <ul>
                  <li><strong>Hit :</strong> Take another card from the dealer.</li>
                  <li><strong>Stand :</strong> Take no more cards, also known as "stand pat", "stick", or "stay"..</li>
                </ul>
              </div>
              
              <div className="w3-container">
                <h3><strong>Cards</strong></h3>
                <img src={baraja} className="w3-round w3-margin-left w3-image w3-center" alt="Norway"/>
              </div>
              
            </div>
            
            
            <div className ="w3-container footer w3-grey">
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

export default Main
