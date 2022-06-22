import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "react-toastify"

const BudgetContext = createContext( {
    transactions : [],
    income: 0,
    expense:0,
    addToTransaction : (transaction) => {},
    deleteFromTransaction : (id) => {}
});

const findFilteredSum = (transactions,type) => {
    return transactions.length > 0 && transactions
                .filter((transaction)=>transaction.type===type)
                .reduce((totalSum,currentTransaction) => totalSum + parseInt(currentTransaction.amount),0)
}

export const useBudget = () => useContext(BudgetContext);

const url = 'https://expense-tracker-97721-default-rtdb.firebaseio.com/transactions';

const BudgetProvider = (props) => {
    const [transactions,setTransactions] = useState([]);
    const [income,setIncome] = useState(0)
    const [expense , setExpense] = useState(0)
    useEffect(() => {
        const fetchTransactions = async() => {
            try {
                const res = await fetch(url+'.json');
                if(!res.ok) {
                    throw new Error("Failed to fetch the transactions")
                }
                const data = await res.json();
                const newTransactions = [];
                for(let key in data) {
                    newTransactions.push({
                        _id:key,
                        ...data[key]
                    })
                }
                setTransactions(newTransactions)
            } catch (error) {
                toast.error(error.message)
                return;
            }
        }
        fetchTransactions()
    },[])
    
    useEffect(() => {
        const newIncome = findFilteredSum(transactions,"income");
        const newExpense = findFilteredSum(transactions,"expense");
        setIncome(newIncome)
        setExpense(newExpense)
    },[transactions])

    const addToTransaction = async(transaction) => {
        try {
            const res = await fetch(url+'.json',{
                method:"post",
                body : JSON.stringify(transaction)
            });
            if(!res.ok) {
                throw new Error("Failed to add the transaction")
            }
            const data = await res.json();
            setTransactions([
                ...transactions,
                {
                    _id : data.name,
                    ...transaction
                }
            ])
        } catch (error) {
            toast.error(error.message)
            return;
        }
    }
    const deleteFromTransaction = async(id) => {
        try {
            const res = await fetch(url+`/${id}.json`,{
                method:"delete"
            });
            if(!res.ok) {
                throw new Error("Failed to delete the transaction")
            }
            const newTransactions = transactions.filter((transaction) => transaction._id !== id);
            setTransactions(newTransactions)
        } catch (error) {
            toast.error(error.message)
            return;
        }
    }

    const contextValue = {
        transactions,
        income,
        expense,
        addToTransaction,
        deleteFromTransaction,
    }
    return (
        <BudgetContext.Provider value={contextValue}>
            {props.children}
        </BudgetContext.Provider>
    )
}

export default BudgetProvider;