import styles from "./ExpenseList.module.css";

import { useFetchExpenses } from "../../hooks/useFetchExpenses";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { database } from "../../../firebaseConfig";

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
  const { validate, formErrors } = useFormValidation();

  //retrieving new expense values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle form submit of new expense
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validate(newExpense)) {
      console.log("new expense form submission failed");
      return;
    }

    try {
      await addDoc(collection(database, "expenses"), {
        description: newExpense.description,
        amount: newExpense.amount,
        category: newExpense.category,
        date: newExpense.date,
        createdAt: serverTimestamp(),
      });
      console.log("Expense added successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.expenseTrackerWrapper}>
      <form
        className={styles.newExpenseForm}
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Add a short description"
            value={newExpense.description}
            onChange={handleInputChange}
            required
          />
          {formErrors && <p>{formErrors.description}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="add an amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
          />
          {formErrors && <p>{formErrors.amount}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
          >
            <option value="">Choose a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>
          {formErrors && <p>{formErrors.category}</p>}
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
          {formErrors && <p>{formErrors.date}</p>}
        </div>

        <button className="add-button">Add Expense</button>
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
