import React, { useEffect, useState } from 'react';
import styles from './change-data-form.module.scss';
import { Button, Header, Modal, Form, Select, Checkbox, Input } from 'semantic-ui-react'
import {useDispatch, useSelector } from 'react-redux';
import { ExpenseData, setChangeDataFormOpen } from '../../redux/table-reduser';
import { getAllExpensesData } from '../../redux/table-reduser'
import { expensesDataAPI } from '../../api/api';

export function ChangeDataForm () {

    const formIsOpen = useSelector((state: any) => state.tableData.chancheFormIsOpen);
    const dataRowBeginModified = useSelector((state: any) => state.tableData.dataRowBeginModified);
    const currYear = useSelector((state: any) => state.tableData.currentYear);
    const currMonth = useSelector((state: any) => state.tableData.currentMonth);
    const dataSource = useSelector((state: any) => state.tableData.dataSource);
    const [isPlus, setIsPlus] = useState(true);
    const [costInputValue, setCostInputValue] = useState("");
    const dispatch = useDispatch();

    const onCchangeCostValue = (e: any, data: any) => {
        setCostInputValue(data.value)
    }
    
    const handleSubmit = (event: any) => {
      
        const updatedRow = {
            ...dataRowBeginModified,
            cost: isPlus ? Number(dataRowBeginModified.cost) + Number(costInputValue) : +costInputValue,
        }
        const newDataSource: Array<ExpenseData> = [...dataSource].map((row) => {
            if(row.key === updatedRow.key) {
                return updatedRow;
            }
            return row;
        })

        dispatch(setChangeDataFormOpen(null,false, null));
        expensesDataAPI.editExpense(currYear, currMonth, newDataSource)
            .then((response: any) => {
                if(response.resultCode === 'successfull') {
                    dispatch(getAllExpensesData(currYear, currMonth));
                }
            });
        event.preventDefault();
    }
    
    return (
        <Modal open={formIsOpen} closeIcon
            onClose={() => {
                dispatch(setChangeDataFormOpen(null,false, null));
                setCostInputValue("");
                setIsPlus(true);
            }}>
            <Header content={"Отредактируйте стоимость"} />
            <Modal.Content>
            <Form onSubmit={handleSubmit} className={styles.changeDataForm} >
                <div className={styles.initialValue}>{ dataRowBeginModified?.cost }</div>
                <div>{ isPlus ? "Прибавить" : "Ввести новое значение" }</div>
                <Checkbox toggle checked={isPlus} onChange={() => setIsPlus(!isPlus)} />
                <div>
                    <Input required name="cost" value={costInputValue} placeholder={"Введите сумму"}
                        onChange={onCchangeCostValue} type={"number"} className={styles.costInput} />
                </div>
                <Button primary type='submit' className={styles.submitBtn}>Save</Button>
            </Form>
        </Modal.Content>
    </Modal>
    )
}