import styles from "./ExpenseList.module.css";

import { useFetchExpenses } from "../../hooks/useFetchExpenses";
import { useState } from "react";

const ExpenseList = () => {
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const { expenses, fetchExpensesErrorMessage, isFetchingExpenses } =
    useFetchExpenses();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewExpense((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.expenseTrackerWrapper}>
      <form className={styles.newExpenseForm} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Lunch at restaurant"
            value={newExpense.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="25.50"
            value={newExpense.amount}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
          >
            <option value="Food">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="add-button">
          Add Expense
        </button>
      </form>

      <table className={styles.expenseTable}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{expenses.map((expense) => {})}</tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
