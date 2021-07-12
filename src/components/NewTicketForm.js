import React from "react";
import PropTypes from "prop-types";
import ReuseableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

  function NewTicketForm(props){
    const firestore= useFirestore();

    function addTicketToFirestore(e) {
      e.preventDefault();
      props.onNewTicketCreation();

    return firestore.collection('tickets').add(
      {
        names: e.target.names.value,
        location: e.target.location.value, 
        issue: e.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }


    // function handleNewTicketFormSubmission(event) {
    //   event.preventDefault();
    //   props.onNewTicketCreation({
    //     names: event.target.names.value, 
    //     location: event.target.location.value, 
    //     issue: event.target.issue.value, 
    //     id: v4(),
    //     timeOpen: new Moment(),
    //     formattedWaitTime: new Moment().fromNow(true)
    //   });
    // }

  return (
    <React.Fragment>
      <ReuseableForm
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
};

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;