import React from 'react';
import 'bulma/css/bulma.css'
import 'w3-css/w3.css';

function Main() {
    return (
          <div>
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
            <section className="hero is-dark">
              <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </a>
                </div>
                    
                <div id="navbarBasicExample" className="navbar-menu">
                  <div className="navbar-start">
                    <a className="navbar-item"> Home </a>
                    <a className="navbar-item"> Create Game </a>
                    <a className="navbar-item"> Join Game </a>
                  </div>
                    
                  <div className="navbar-end">
                    <div className="navbar-item">
                      <div className="buttons">
                        <a href="https://github.com/SwimmerRafa/BlackJack21" className="button is-info">
                          <i className="fab fa-github"></i>
                          <strong>Github</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </section>
            
            <div className="w3-container w3-light-gray">
              <div className="w3-container w3-center">
                <h1>21 Blackjack</h1>
              </div>
              
              <div className="w3-container w3-left">
                <h2><strong>Game Rules</strong></h2>
                <p>
                  Players are each dealt two cards, face up or down depending on the casino and the table. The dealer is also dealt two cards, 
                  normally one up (exposed) and one down (hidden). The value of cards two through ten is their pip value (2 through 10). Face cards (Jack, Queen, and King) 
                  are all worth ten. Aces can be worth one or eleven. 
                  A hand's value is the sum of the card values. Players are allowed to draw additional cards to improve their hands. A hand with an ace valued as 
                  11 is called "soft", meaning that the hand will not bust by taking an additional card. The value of the ace will become one to prevent the hand 
                  from exceeding 21. Otherwise, the hand is called "hard".
                </p>
                <br/>
                <p>
                  Once all the players have completed their hands, it is the dealer's turn. The dealer hand will not be completed if all players have either 
                  busted or received blackjacks. The dealer then reveals the hidden card and must hit until the cards total up to 17 points. At 17 points or higher 
                  the dealer must stay. 
                  You are betting that you have a better hand than the dealer. The better hand is the hand where the sum of the card values is closer to 21 without 
                  exceeding 21. The detailed outcome of the hand follows:
                </p>
                <br/>
                <ul>
                  <li>If the player is dealt an Ace and a ten-value card (called a "blackjack" or "natural"), and the dealer does not, the player wins and usually receives a bonus.</li>
                  <li>If the player exceeds a sum of 21 ("busts"); the player loses, even if the dealer also exceeds 21.</li>
                  <li>If the dealer exceeds 21 ("busts") and the player does not; the player wins.</li>
                  <li>If the player attains a final sum higher than the dealer and does not bust; the player wins.</li>
                  <li>If both dealer and player receive a blackjack or any other hands with the same sum, called a "push", no one wins.</li>
                </ul>
              </div>
              
              <div className="w3-container">
                <h2><strong>Player Decisions</strong></h2>
                <ul>
                  <li><strong>Hit :</strong> Take another card from the dealer.</li>
                  <li><strong>Stand :</strong> Take no more cards, also known as "stand pat", "stick", or "stay"..</li>
                </ul>
              </div>
            </div>
            
            <footer className="footer is-black has-text-centered">
              <p style={{color: "white"}}>
                <strong style={{color: "white"}}>Developed </strong> by
                <a style={{color: "deepskyblue"}} href="https://www.linkedin.com/in/rafael-moreno-ca%C3%B1as-aba58a1a6/"> Rafael Moreno</a>,
                <a style={{color: "deepskyblue"}} href="#"> Ricardo Velazquez </a> and
                <a style={{color: "deepskyblue"}} href="#"> Eric Gomez</a>
              </p>
            </footer>
          </div>
    )
}

export default Main
