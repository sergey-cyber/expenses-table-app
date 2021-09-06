import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ExpenseData, State } from '../../redux/table-reduser';
import { useLocalization } from '../../utilits/hooks/useLangLoocalization';
import styles from './footer.module.scss';

export const Footer = () => {

    const currentLocalization = useLocalization();
    const dataSource = useSelector((state: any) => state.tableData.dataSource);
    const costArray = dataSource.map((el: ExpenseData) => el.cost)
    const costSumm = costArray.reduce((start: number, end: number) => start + end, 0)

    return (
        <div className={styles.footer}>
            <div> { currentLocalization.footer } {costSumm} </div>
        </div>
    );
}