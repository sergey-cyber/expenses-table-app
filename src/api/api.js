import * as axios from "axios";

const instance = axios.create({ 
    /* withCredentials: true, */
    baseURL: /* 'http://localhost:5000/api/' */ 'https://my-expenses-table-app.herokuapp.com/api/',
    headers: {
        /* "Access-Control-Allow-Origin": "*" */
    }    
});

export const expensesDataAPI = {
    getAllExpenses (year, month) {
        return instance.get(`expensesData?year=${year}&month=${month}`) //Базовый урл сам добавляется
            .then((response) => response.data)
    },
    postNewExpense(year, month, newExpenseData) {  //в объекте приходит: key, discription, cost, date
        return instance.post('expensesData', { year, month, newExpenseData}) 
            .then((response) => response.data)
    },
    editExpense(year, month, newMonthData) {  //Приходит массив со всеми данными
        return instance.patch('expensesData', {year, month, newMonthData}) 
            .then((response) => response.data)
    },
    deleteExpense(year, month, itemKey) {  //в объекте приходит: key, no, discription, cost, date
        return instance.delete(`expensesData?year=${year}&month=${month}&itemKey=${itemKey}`) //Отправляем Key элемента который нужно удалить 
            .then((response) => response.data)
    }
}



