import React from 'react'
import { useBudget } from '../../store/BudgetProvider';
import TransactionList from './TransactionList';
import styles from './Transaction.module.css';
const Transaction = () => {
  const {transactions} = useBudget()
  return (
    <div className={styles.container}>
      <div className={styles.header}>History of Transactions...</div>
      <div className={styles.transactionList}>
          {
            transactions.length > 0 ?
            transactions.map((transaction,index) => {
              return <TransactionList key={index} transaction={transaction} />
            }) :
            <h1 className={styles.noTransaction}>No Transactions Found!</h1>
          }
      </div>
    </div>
  )
}

export default Transaction
