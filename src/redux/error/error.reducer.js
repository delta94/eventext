import { combineReducers } from 'redux';

import sessionErrorReducer from './session-error/session-error.reducer';

const errorReducer = combineReducers({
    session: sessionErrorReducer
});

export default errorReducer;