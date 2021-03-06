import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as a from './../actions';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  // handleEditingTicketInList = (ticketToEdit) => {
  //   const editedMasterTicketList = this.state.masterTicketList
  //   .filter(ticket => ticket.id !== this.state.selectedTicket.id)
  //   .concat(ticketToEdit);
  // this.setState({
  //   masterTicketList: editedMasterTicketList,
  //   editing: false,
  //   selectedTicket: null
  // });
  // }

  // handleEditingTicketInList = (ticketToEdit) => {
  //   const { dispatch } = this.props;
  //   const action = a.addTicket(ticketToEdit);
  //   dispatch(action);
  //   this.setState({
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }

  // handleEditingTicketInList = (ticketToEdit) => {
  //   const { dispatch } = this.props;
  //   const { id, names, location, issue } = ticketToEdit;
  //   const action = {
  //     type: 'ADD_TICKET',
  //     id: id,
  //     names: names,
  //     location: location,
  //     issue: issue,
  //   }
  //   dispatch(action);
  //   this.setState({
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }


  // Without Redux
  // handleAddingNewTicketToList = (newTicket) => {
  //   const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
  //   this.setState({
  //     masterTicketList: newMasterTicketList,
  //     formVisibleOnPage: false });
  // }

  // // With Redux
  // handleAddingNewTicketToList = (newTicket) => {
  //   const { dispatch } = this.props;
  //   const action = a.addTicket(newTicket);
  //   dispatch(action);
  //   const action2 = a.toggleForm();
  //   dispatch (action2);
  // }

    handleAddingNewTicketToList = () => {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
  }


  // handleDeletingTicket = (id) => {
  //   const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
  //   this.setState({
  //     masterTicketList: newMasterTicketList,
  //     selectedTicket: null
  //   });
  // }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  // handleDeletingTicket = (id) => {
  //   const { dispatch } = this.props;
  //   const action = {
  //     type: 'DELETE_TICKET',
  //     id: id
  //   }
  //   dispatch(action);
  //   this.setState({ selectedTicket: null });
  // }

  handleEditClick = () => {
    console.log("handleEdirClick reached!");
    this.setState({ editing: true });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        //formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
    }
  }

  // handleChangingSelectedTicket = (id) => {
  //   const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
  //   this.setState({selectedTicket: selectedTicket});
  // }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState =
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Ticket List";
      // } else if (this.state.formVisibleOnPage) {
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;