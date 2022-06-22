import React from 'react';
import { useBudget } from '../../store/BudgetProvider';
import styles from './Transaction.module.css';

const TransactionList = ({transaction}) => {
    const {deleteFromTransaction} = useBudget();
  return (
    <div className={styles.transaction}>
        <div>{transaction?.title}</div>
        <div className={`${styles.amount} ${transaction.type === 'expense' ? styles.typeExpense : styles.typeIncome }`}>{transaction?.amount}</div>
        <div onClick={() => deleteFromTransaction(transaction._id)} style={{cursor:"pointer"}}>x</div>
    </div>
  )
}

export default TransactionList
