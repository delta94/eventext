import { combineReducers } from 'redux';
import sessionReducer from './session/session.reducer';
import textReducer from './text/text.reducer';
import segmentReducer from './segment/segment.reducer';
import directoryReducer from './directory/directory.reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    texts: textReducer,
    segments: segmentReducer,
    directories: directoryReducer
});

export default rootReducer;