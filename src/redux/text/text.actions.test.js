import { textActionTypes } from './text.actions';
import textReducer from './text.reducer';
import DATA from './text.data';

it('should return initial state of DATA when no action is passed', () => {
    const newState = textReducer(undefined, {});
    expect(newState).toEqual(DATA);
});

it('should create new text message when createText action is passed', () => {
    const initialState = textReducer(undefined, {});
    const initialStateLength = Object.keys(initialState.texts).length;

    const newText = DATA.texts[4];
    const action = { type: textActionTypes.CREATE_TEXT, data: newText };
    
    const newState = textReducer(undefined, action);
    const newStateLength = initialStateLength + 1;
    const lastItem = Object.values(Object.assign({}, newState.texts)).pop();

    expect(Object.keys(newState.texts)).toHaveLength(newStateLength);
    expect(lastItem).toEqual(newText);
});