import { useState } from "react";

import styles from "./App.module.css";
import ExpenseList from "./components/ExpenseList/ExpenseList";

function App() {
  return (
    <div className={styles.rootContainer}>
      <ExpenseList></ExpenseList>
    </div>
  );
}

export default App;
