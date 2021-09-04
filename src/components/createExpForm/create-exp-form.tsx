import React, { useState } from 'react';
import styles from './create-exp-form.module.scss';
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import {useDispatch, useSelector } from 'react-redux';
import { postNewExpense, State } from '../../redux/table-reduser';
import { generateHexString } from '../../utilits/randomKeyGenerator';

type FormData = {
    discription: string,
    cost: number,
    inThisMounth: boolean,
    date: string
}

type Props = {
    setShowCreateExpenseForm: any,
    showCreateExpenseForm: boolean
}

type SubmitValues = {
    key: string,
    discription: string,
    cost: number,
    date: string,
}

export function CrateExpenseForm (props: Props) {

    const initFormData: FormData = {
        discription: '',
        cost: 0,
        inThisMounth: true,
        date: ''
    }

    const [formData, setFormData ] = useState(initFormData);
    const [requiredError, setRequiredError] = useState({discription: false, cost: false});
    const year: string = useSelector((state: any) => state.tableData.currentYear);
    const month: string = useSelector((state: any) => state.tableData.currentMonth);
    const dispatch = useDispatch()

    const handleSubmit = (event: any) => {
        const submitValues: SubmitValues = {
            key: generateHexString(26),
            discription: formData.discription,
            cost: formData.cost,
            date: formData.date ? formData.date : month
        }
        dispatch(postNewExpense(year, month, submitValues));
        props.setShowCreateExpenseForm(false);
        setFormData(initFormData);
        event.preventDefault();
    }

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({...formData, [name]: value});
        if(!value) {
            setRequiredError({...requiredError, [name]: true})
        } else {
            setRequiredError({...requiredError, [name]: false})
        }
    }

    return (
        <Modal open={props.showCreateExpenseForm} closeIcon
                 onClose={() => props.setShowCreateExpenseForm(false)} 
                 onOpen={() => props.setShowCreateExpenseForm(true)} >
            <Header content='Create new Expense' />
            <Modal.Content>
            <Form onSubmit={handleSubmit} >
                <Form.Field required>
                    <label>Discription:</label>
                    <textarea required placeholder='Expense name' name='discription' value={formData.discription} onChange={handleChange} />
                    {requiredError.discription && <div className={styles.error}>Require field</div>}
                </Form.Field>
                <Form.Field required>
                    <label>Cost:</label>
                    <input type='number' placeholder='Expense cost' name='cost' 
                        autoComplete={"off"} value={formData.cost} onChange={handleChange} required />
                    {requiredError.cost && <div className={styles.error}>Require field</div>}
                </Form.Field>
                {
                !formData.inThisMounth && 
                <Form.Field>
                    <label>Date:</label>
                    <input placeholder='Expense date' name='date' value={formData.date} onChange={handleChange} autoComplete={"off"} />
                </Form.Field>
                }               
                <Form.Field>
                <label className={styles.checkbox}>In this mounth:
                    <input type="checkbox" name='inThisMounth' checked={formData.inThisMounth} onChange={handleChange} />
                </label>
                </Form.Field>
                <Button primary type='submit'>Create</Button>
            </Form>
        </Modal.Content>
    </Modal>
    )
}