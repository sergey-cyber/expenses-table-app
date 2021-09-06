import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";  
import tableReduser from "./table-reduser";
import localizationReduser from "./localization-reduser";

let redusers = combineReducers({
    tableData: tableReduser,
    localizationData: localizationReduser
    /* form: formReducer  */  //redux-form Lesson 75
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;