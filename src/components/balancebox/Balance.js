import React from "react";
import { useBudget } from "../../store/BudgetProvider";
import styles from "./Balance.module.css";

const Balance = () => {
  const { income, expense } = useBudget();
  return (
    <div className={styles.balanceBox}>
      <div className={styles.income}>
        Income - <strong>&#x20B9; </strong>
        {Number(income).toFixed(2)}
      </div>
      <div
        className={`${styles.savings} ${
          income - expense < 0 ? styles.expense : ""
        }`}
      >
        Savings - <strong>&#x20B9; </strong>
        {Math.abs(Number(income) - Number(expense)).toFixed(2)}
      </div>
      <div className={styles.expense}>
        Expenditure - <strong>&#x20B9; </strong>
        {Number(expense).toFixed(2)}
      </div>
    </div>
  );
};

export default Balance;
