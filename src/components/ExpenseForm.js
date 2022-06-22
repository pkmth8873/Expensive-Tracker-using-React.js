import { useState } from 'react';
import { useBudget } from '../store/BudgetProvider';
import styles from './Expenseform.module.css'
const initialState = {type:"income",title:"",amount:""};
const ExpenseForm = () => {
    const [expenseData,setExpeseData]=useState(initialState);
    const [error,setError]=useState({
        title:'',
        amount:''
    })
    const {addToTransaction} = useBudget();
    const handleChange = (e) => {
        const {name,value} = e.target;
        setExpeseData((prevState) => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }
    const numberExpression = /^[0-9]+$/;
    const handleExpenseFormSubmit = (e) => {
        e.preventDefault()
        const titleIsValid = expenseData.title.trim().length !== 0 ;
        const amountIsValid = numberExpression.test(expenseData.amount);
        const formIsValid = titleIsValid && amountIsValid ;
        setError({
          title : !titleIsValid ,
          amount: !amountIsValid
        })
        if(!formIsValid) {
          return ;
        }
        addToTransaction(expenseData);
        setExpeseData({
            ...expenseData,
            title:"",
            amount:""
        })
    }

    return (
        <div className={styles.expenseform}>
            <form className={styles.form} onSubmit={handleExpenseFormSubmit}>
                <h2>Add Income/Expense</h2>
                <div className={styles.formControl}>
                    <label>Select Type </label>
                    <select value={expenseData.type} onChange={handleChange} name="type">
                        <option value="income" >Income</option>
                        <option value="expense" >Expense</option>
                    </select>
                </div>
                <div className={`${styles.formControl} ${error.title ? styles.error : ''}`}>
                    <label>Title</label>
                    <input type="text" value={expenseData.title} onChange={handleChange} name="title" placeholder='Expense/Income Title' />
                    {error.title && <div style={{color:"#e74c3c"}}> Please Enter valid title !</div>} 
                </div>
                <div className={`${styles.formControl} ${error.amount ? styles.error : ''}`}>
                    <label>Amount </label>
                    <input type="number" value={expenseData.amount} onChange={handleChange} name="amount" />
                    {error.amount && <div style={{color:"#e74c3c"}}> Please Enter valid amount !</div>}
                </div>
                <button type='submit' className={styles.btn}>Add Transaction</button>
            </form>
        </div>
    )
}

export default ExpenseForm;
