import * as axios from "axios";

const instance = axios.create({ 
    /* withCredentials: true, */
    baseURL: 'http://localhost:5000/api/' /* 'https://enigmatic-shelf-37325.herokuapp.com/api/' */,
    headers: {
        /* "Access-Control-Allow-Origin": "*" */
    }    
});

export const expensesDataAPI = {
    getAllExpenses () {
        return instance.get('expensesData') //Базовый урл сам добавляется
            .then((response) => response.data)
    },
    postNewExpense(newExpensesData) {  //в объекте приходит: key, discription, cost, date
        return instance.post('expensesData', newExpensesData) 
            .then((response) => response.data)
    },
    editExpense(newExpensesData) {  //Приходит массив со всеми данными
        return instance.patch('expensesData', newExpensesData) 
            .then((response) => response.data)
    },
    deleteExpense(itemKey) {  //в объекте приходит: key, no, discription, cost, date
        return instance.delete(`expensesData/${itemKey}`) //Отправляем Key элемента который нужно удалить 
            .then((response) => response.data)
    }
}

/* export const homePageDataAPI = {
    getReviewsPart (currentRevPart = 1, revPartSize = 5) {
        return instance.get(`home?currentRevPart=${currentRevPart}&revPartSize=${revPartSize}`) 
            .then((response) => response.data)
    },
    postNewReview (reviewFormData) {
        return instance.post('home/', {reviewFormData}) 
            .then((response) => response.data)
    }
} */


