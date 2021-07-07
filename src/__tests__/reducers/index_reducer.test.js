import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';

let store = createStore(rootReducer);

describe("rootReducer", () => {
  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterTickerList: {},
      formVisibleOnPage: false
    });
  });

  test('Check that initial state of ticketListReducer matches root reducer', () => {
    expect(store.getState().masterTickerList).toEqual(ticketListReducer(undefined, { type: null}));
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test('Check that ADD_TICKET action works for ticketListReducer and rootReducer', () => {
    const action = {
      type: 'ADD_TICKET',
      names: 'Ryan and Aimen',
      location: '4b',
      issue: 'Redux is not working correctly.',
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().masterTickerList).toEqual(ticketListReducer(undefined, action));
  });

  test('Check that TOGGLE_FORM action works for formVisibleReducer and rootReducer', () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });
});