import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Balance from './components/balancebox/Balance';
import ExpenseForm from './components/ExpenseForm';
import NavBar from './components/NavBar';
import Transaction from './components/transaction/Transaction';
import BudgetProvider from './store/BudgetProvider';
const App = () => {
  return (
    <BudgetProvider>
      <NavBar />
      <Balance />
      <ExpenseForm />
      <Transaction />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </BudgetProvider>
  )
}

export default App;
