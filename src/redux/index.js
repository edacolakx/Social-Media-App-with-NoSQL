import { combineReducers } from "redux";
import reducers from "./reducer";
import genelResponseReducer from "./reducer";

export default combineReducers({
    genelResponse: genelResponseReducer
})