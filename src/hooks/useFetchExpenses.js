import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { database } from "../../firebaseConfig";

export const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [fetchExpensesErrorMessage, setfetchExpensesErrorMessage] =
    useState("");
  const [isFetchingExpenses, setIsFetchingExpenses] = useState(false);

  const fetchExpenses = useCallback(async () => {
    setIsFetchingExpenses(true);
    try {
      const q = query(
        collection(database, "expenses"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      const expensesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setfetchExpensesErrorMessage("");
      setExpenses(expensesList);
    } catch (error) {
      console.log(error.message);
      setfetchExpensesErrorMessage(
        "There seems to be a problem loading your expenses, please try again later"
      );
    } finally {
      setIsFetchingExpenses(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    fetchExpensesErrorMessage,
    isFetchingExpenses,

    refetch: fetchExpenses,
  };
};
