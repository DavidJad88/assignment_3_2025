import styles from "./ExpenseItem.module.css";

import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig";

const ExpenseItem = ({ expense, refetch }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editFormErrorMessage, setEditFormErrorMessage] = useState("");

  //handle edit button click
  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setEditData({ ...expense });
  };

  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited expense
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update in Firestore
      const expenseRef = doc(database, "expenses", editingId);
      await updateDoc(expenseRef, {
        ...editData,
        amount: parseFloat(editData.amount),
      });
      setEditingId(null);
      setEditData({});
      refetch();
      setEditFormErrorMessage("");
    } catch (error) {
      setEditFormErrorMessage("Problem Updating your expense");
    }
  };

  // Cancel editing
  const handleCancelClick = () => {
    setEditingId(null);
    setEditData({});
  };

  // formatting for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <li className={styles.expenseItem}>
      <span className={styles.createdDate}>
        Created:{" "}
        {expense.createdAt?.toDate
          ? formatDate(expense.createdAt.toDate())
          : formatDate(expense.createdAt || expense.date)}
      </span>
      {editFormErrorMessage && (
        <span className={styles.editFormErrorMessage}>
          {editFormErrorMessage}
        </span>
      )}
      {editingId ? (
        // Edit Form
        <form className={styles.editForm} onSubmit={handleEditFormSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="description">Desription</label>
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={handleEditChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="amount?">Amount</label>
            <input
              type="number"
              name="amount"
              value={editData.amount}
              onChange={handleEditChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={editData.category}
              onChange={handleEditChange}
            >
              <option value="Groceries">Groceries</option>
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
              name="date"
              value={editData.date}
              onChange={handleEditChange}
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.editformSubmitButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // Display View
        <div className={styles.expenseDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Description:</span>
            <span className={styles.detailValue}>{expense.description}</span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Amount:</span>
            <span className={styles.detailValue}>
              ${parseFloat(expense.amount).toFixed(2)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Category:</span>
            <span className={`${styles.detailValue} ${styles.categoryBadge}`}>
              {expense.category}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Date:</span>
            <span className={styles.detailValue}>
              {formatDate(expense.date)}
            </span>
          </div>

          <div className={styles.itemActions}>
            <button
              onClick={() => handleEditClick(expense)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button className={styles.deleteButton}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ExpenseItem;
