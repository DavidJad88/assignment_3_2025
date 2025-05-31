import { useState } from "react";
import styles from "./Filter.module.css";

const Filter = ({
  expenses,
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
}) => {
  let years = [];
  if (Array.isArray(expenses) && expenses.length > 0) {
    years = [
      ...new Set(
        expenses.map((expense) => {
          const date = expense?.date?.toDate?.() || new Date(expense.date);
          return date.getFullYear();
        })
      ),
    ].sort((a, b) => b - a);
  }

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.monthSelectorContainer}>
        <label htmlFor="month">Month:</label>
        <select
          name="month"
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="all">All</option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>
      <div className={styles.yearSelectorContainer}>
        <label htmlFor="year">Year:</label>
        <select
          name="year"
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
