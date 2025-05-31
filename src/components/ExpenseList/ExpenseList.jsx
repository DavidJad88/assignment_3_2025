import styles from "./ExpenseList.module.css";

import { useFetchExpenses } from "../../hooks/useFetchExpenses";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = () => {
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const { expenses, fetchExpensesErrorMessage, isFetchingExpenses, refetch } =
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
      setNewExpense({ description: "", amount: "", category: "", date: "" });
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.expenseTrackerWrapper}>
      <h1 className={styles.expenseTrackerHeader}>Add a new expense</h1>
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
        <button className={styles.addButton}>Add Expense</button>
      </form>

      {expenses.length > 0 ? (
        <ul className={styles.expenseList}>
          <h2 className={styles.expenseListHeading}>Your expenses</h2>
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} refetch={refetch} />
          ))}
        </ul>
      ) : (
        <div>{fetchExpensesErrorMessage}</div>
      )}
    </div>
  );
};

export default ExpenseList;
