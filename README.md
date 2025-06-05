# Expense Tracker App

[Live Demo](https://expensetracker-a3.netlify.app/)  
[GitHub Repository](https://github.com/DavidJad88/assignment_3_2025)

## Overview

This project is a **React-based Expense Tracker App** built as an individual assignment for the Frontend Development (FFU1200) course, Semester 2. The app allows users to add, edit, delete, and filter expenses, with all data stored in Firestore for persistence. The application is fully responsive, uses a component-based architecture, and leverages React hooks for state management and logic.

---

## Features

- **Add Expenses:** Users can enter new expenses with a title, amount, date, and category.
- **Edit Expenses:** Existing expenses can be edited in place.
- **Delete Expenses:** Users can remove expenses with confirmation.
- **Filter Expenses:** Expenses can be filtered by month and year using dropdowns.
- **Calculate Total:** The app displays the total amount for the currently filtered expenses.
- **Data Persistence:** All expense data is stored in Firestore, ensuring persistence across page reloads.
- **Form Validation:** All fields are required; users receive clear feedback if any field is missing or invalid.
- **Responsive Design:** The layout adapts to different screen sizes for a smooth user experience.
- **Organized Display:** Expenses are shown in a table-like list, grouped and sorted for clarity.

---

## Data Model

Each expense contains:

- **ID:** Automatically generated unique identifier (Firestore document ID)
- **Title:** Name or description of the expense
- **Amount:** Numeric value (stored as a number)
- **Date:** ISO 8601 string (stored as a string in Firestore)
- **Category:** One of: housing, utilities, grocery, transportation, clothing, entertainment, other
- **CreatedAt:** Firestore server timestamp for sorting and display

---

## Technical Details

- **React with Vite:** Fast development and build tooling.
- **Functional Components & Hooks:** All logic is implemented using React hooks (`useState`, custom hooks).
- **Component Structure:**
  - `ExpenseList`: Main logic, form, and list rendering
  - `ExpenseItem`: Individual expense display, edit, and delete
  - `Filter`: Dropdowns for month/year filtering
  - `useFetchExpenses`, `useFormValidation`, `useEditFormValidation`: Custom hooks for data and validation logic
- **Styling:** CSS Modules for scoped, maintainable styles.
- **Firestore Integration:** All CRUD operations are performed against Firestore, ensuring real-time persistence.
- **Validation:** Both add and edit forms require all fields and provide inline error messages.

---

## How Filtering Works

- **Month and Year Selectors:**
  - The month selector always shows all months (Jan–Dec).
  - The year selector dynamically lists only years present in the expense data.
- **Filtering Logic:**
  - The list of expenses is filtered in the parent component (`ExpenseList`) based on the selected month and year.
  - The total is recalculated for the filtered list.

---

## License & Credits

This project is for educational purposes as part of Kristiania University College's curriculum.

---
