import React from "react";
import ticketsImage from "./../img/tickets.jpeg";

function Header(){
  return (
    <React.Fragment>
    <h1>Help Queue</h1>
    <img src={ticketsImage} alt="an image of a corner of a building with the sign reading 'Tickets'" />
    </React.Fragment>
  );
}

export default Header;