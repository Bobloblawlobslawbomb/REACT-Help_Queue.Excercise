import React from "react";
import ticketsImage from "./../img/tickets.jpeg";


function Header(props){
  const myFunkyStles = {
    height: '40vh',
    textAlign: 'center'
  }

  return (
      <div style={myFunkyStles}>
        <h1>Help Queue</h1>
        <img src={ticketsImage} alt="a corner of a building with the sign reading 'Tickets'" />
      </div>
  );
}

export default Header;