import { expensesDataAPI } from "../api/api";

const GET_ALL_EXPENSES = 'expenses-app/tableData/GET_ALL_EXPENSES';
const SET_DATA_IS_LOADING = 'expenses-app/tableData/SET_DATA_IS_LOADING';

export type ExpenseData = {
    key: string,
    discription: string,
    cost: number,
    date: string
}

export type State = {
    dataSource: Array<ExpenseData> | [],
    dataSourceIsLoading: boolean
}

type Action = {
        type: typeof GET_ALL_EXPENSES,
        dataSource: Array<ExpenseData>
    } | {
        type: typeof SET_DATA_IS_LOADING,
        isLoading: boolean
    }

const initialState: State = {
    dataSource: [],
    dataSourceIsLoading: false
};

const tableReduser = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case GET_ALL_EXPENSES:
            return {
                ...state,
                dataSource: action.dataSource,
            }
        case SET_DATA_IS_LOADING:
            return {
                ...state,
                dataSourceIsLoading: action.isLoading,
        }
        default:
            return state;
    }
}

//Action Creators

export const getAllExpensesDataAction = (expenses:Array<ExpenseData>): Action => {
    return { type: GET_ALL_EXPENSES, dataSource: expenses };
}

export const setDataIsLoading = (isLoading: boolean): Action => {
    return { type: SET_DATA_IS_LOADING, isLoading };
}

//Thunks

export const getAllExpensesData = () => {   
    return (dispatch: any) => {
        dispatch(setDataIsLoading(true));
        return expensesDataAPI.getAllExpenses().then((response: any) => {
            if (response.resultCode === 'successfull') {
                dispatch(getAllExpensesDataAction(response.expenses));
            }
            dispatch(setDataIsLoading(false));
        });
    }
}

export const postNewExpense = (newData: ExpenseData) => {   
    return (dispatch: any) => {
        return expensesDataAPI.postNewExpense(newData).then((response: any) => {
            if (response.resultCode === 'successfull') {
                dispatch(getAllExpensesData());
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