import { expensesDataAPI } from "../api/api";
import { getCurrentMonth, getCurrentYear } from "../utilits/calcCurrentDate";

enum Actions {
    GET_ALL_EXPENSES = 'expenses-app/tableData/GET_ALL_EXPENSES',
    SET_DATA_IS_LOADING = 'expenses-app/tableData/SET_DATA_IS_LOADING',
    SET_CUURENT_DATE = 'expenses-app/tableData/SET_CUURENT_DATE',
    SET_CHANGE_DATA_FORM_OPEN = 'expenses-app/tableData/SET_CHANGE_DATA_FORM_OPEN'
}

type Action = {
    type: Actions.GET_ALL_EXPENSES,
    dataSource: Array<ExpenseData>,
    yearsInBD: Array<string>
} | {
    type: Actions.SET_DATA_IS_LOADING,
    isLoading: boolean
} | {
    type: Actions.SET_CUURENT_DATE,
    currentYear: string,
    currentMonth: string
} | {
    type: Actions.SET_CHANGE_DATA_FORM_OPEN, 
    currFieldNameChange: string | null, 
    chancheFormIsOpen: boolean,
    dataRowBeginModified: object | null
}

export type ExpenseData = {
    key: string,
    discription: string,
    cost: number,
    date: string
}

export type State = {
    dataSource: Array<ExpenseData> | [],
    currentYear: string,
    currentMonth: string,
    dataSourceIsLoading: boolean,
    currFieldNameChange: string | null
    chancheFormIsOpen: boolean,
    dataRowBeginModified: object | null,
    yearsInBD: Array<string> | []
}

const initialState: State = {
    dataSource: [],
    currentYear: getCurrentYear,
    currentMonth: getCurrentMonth,
    dataSourceIsLoading: false,
    currFieldNameChange: null,
    chancheFormIsOpen: false,
    dataRowBeginModified: null,
    yearsInBD: [] //Количество годов с данными, приходит с сервера
};

const tableReduser = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case Actions.GET_ALL_EXPENSES:
            return {
                ...state,
                dataSource: action.dataSource,
                yearsInBD: action.yearsInBD
            }
        case Actions.SET_DATA_IS_LOADING:
            return {
                ...state,
                dataSourceIsLoading: action.isLoading,
        }
        case Actions.SET_CUURENT_DATE:
            return {
                ...state,
                currentYear: action.currentYear,
                currentMonth: action.currentMonth
        }
        case Actions.SET_CHANGE_DATA_FORM_OPEN:
            return {
                ...state,
                currFieldNameChange: action.currFieldNameChange,
                chancheFormIsOpen: action.chancheFormIsOpen,
                dataRowBeginModified: action.dataRowBeginModified
        }
        default:
            return state;
    }
}

//Action Creators

export const getAllExpensesDataAction = (expenses:Array<ExpenseData>, yearsInBD: Array<string>): Action => {
    return { type: Actions.GET_ALL_EXPENSES, dataSource: expenses, yearsInBD };
}

export const setDataIsLoading = (isLoading: boolean): Action => {
    return { type: Actions.SET_DATA_IS_LOADING, isLoading };
}

export const setCurrentDate = (currentYear: string, currentMonth: string): Action => {
    return { type: Actions.SET_CUURENT_DATE, currentYear, currentMonth };
}

export const setChangeDataFormOpen = (currFieldNameChange: string | null, chancheFormIsOpen: boolean, dataRowBeginModified: object | null): Action => {
    return { type: Actions.SET_CHANGE_DATA_FORM_OPEN, currFieldNameChange, chancheFormIsOpen, dataRowBeginModified };
}

//Thunks

export const getAllExpensesData = (currentYear: string, currentMonth: string) => {   
    return (dispatch: any) => {
        dispatch(setDataIsLoading(true));
        return expensesDataAPI.getAllExpenses(currentYear, currentMonth).then((response: any) => {
            if (response.resultCode === 'successfull') {
                dispatch(getAllExpensesDataAction(response.expenses, response.years));
            }
            dispatch(setDataIsLoading(false));
        });
    }
}

export const postNewExpense = (year: string, month: string, newData: ExpenseData) => {   
    return (dispatch: any) => {
        return expensesDataAPI.postNewExpense(year, month, newData).then((response: any) => {
            if (response.resultCode === 'successfull') {
                dispatch(getAllExpensesData(year, month));
            }
        });
    }
}
/*
export const login = (email, password, rememberMe) => { //Lesson 78
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(setAuth());
        } else {
            dispatch(stopSubmit('login', { _error: 'Error in password or email' })); //Lesson 79
        }
    }
}

export const logout = () => {    //Lesson 78
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
} */

export default tableReduser;