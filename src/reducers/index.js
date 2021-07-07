import formVisibleReducer from "./form-visible-reducer";
import ticketListReducer from "./ticket-list-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterTickerList: ticketListReducer
});

export default rootReducer;