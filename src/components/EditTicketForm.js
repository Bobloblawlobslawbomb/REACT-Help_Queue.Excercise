import React from 'react';
import PropTypes from'prop-types';
import ReuseableForm from './ReusableForm';

function EditTicketForm (props) {
  const { ticket } = props;

  function handleEditTicketFormSubmission(e) {
    e.preventDefault();
    props.onEditTicket({names: e.target.names.value, location: e.target.location.value, issue: e.target.issue.value, id: ticket.id});
  }

  return (
    <React.Fragment>
      <ReuseableForm
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket:PropTypes.func
}

export default EditTicketForm;