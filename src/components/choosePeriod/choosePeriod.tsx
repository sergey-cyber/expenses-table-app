import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'semantic-ui-react'
import { getAllExpensesData, setCurrentDate } from '../../redux/table-reduser'
import { getCurrentMonth, getCurrentYear } from '../../utilits/calcCurrentDate'
import styles from './choosePeriod.module.scss'

export const monthOptions = [
    { key: 'January', value: 'January', text: 'January' },
    { key: 'February', value: 'February', text: 'February' },
    { key: 'March', value: 'March', text: 'March' },
    { key: 'April', value: 'April', text: 'April' },
    { key: 'May', value: 'May', text: 'May' },
    { key: 'June', value: 'June', text: 'June' },
    { key: 'July', value: 'July', text: 'July' },
    { key: 'August', value: 'August', text: 'August' },
    { key: 'September', value: 'September', text: 'September' },
    { key: 'October', value: 'October', text: 'October' },
    { key: 'November', value: 'November', text: 'November' },
    { key: 'December', value: 'December', text: 'December' },
  ]

export const ChoosePeriod = () => {

    const yearsInBD = useSelector((state: any) => state.tableData.yearsInBD);
    const yearOptions = yearsInBD.map((year: string) => ({key: year, value: year, text: year}));    
    const [year, setYear] = useState(getCurrentYear);
    const [month, setMonth] = useState(getCurrentMonth);

    const onYearChange = (e: any, data: any) => {
        setYear(data.value)
    }
    const onMonthChange = (e: any, data: any) => {
        setMonth(data.value)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentDate(year, month));
        dispatch(getAllExpensesData(year, month))
    }, [year, month])
    return ( 
        <div className={styles.choosePeriod}>
            <Select placeholder='Select year' value={year} options={yearOptions}
                className={styles.choosePeriodItem} onChange={onYearChange} />
            <Select placeholder='Select month' value={month} options={monthOptions}
                className={styles.choosePeriodItem} onChange={onMonthChange} />
        </div>
    )  
}
      

