import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types";

function NewTicketForm(props) {

  // const myStyles = {
  //   width: '70%',
  //   padding: '10',
  //   margin: 'auto',
  //   textAlign: 'center'
  // }

  function handleNewTicketFormSubmission(e) {
    e.preventDefault();
    props.onNewTicketCreation({names: e.target.names.value, location: e.target.location.value, issue: e.target.issue.value, id: v4()});
  };

  return (
    <React.Fragment>
    {/* <div style={myStyles}> */}
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          name='names'
          placeholder='Pair Names' />
          <hr/>
        <input
          type='text'
          name='location'
          placeholder='Location' />
          <hr/>
        <textarea
          name='issue'
          placeholder='Describe your issue.' />
          <hr/>
        <button type='submit'>Help!</button>
        <hr/>
      </form>
    {/* </div> */}
    </React.Fragment>
  );
};

  NewTicketForm.propTypes = {
    onNewTicketCreation: PropTypes.func

};
export default NewTicketForm;