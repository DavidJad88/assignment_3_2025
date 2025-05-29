import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";

export const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [fetchExpensesErrorMessage, setfetchExpensesErrorMessage] =
    useState("");
  const [isFetchingExpenses, setIsFetchingExpenses] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsFetchingExpenses(true);
      try {
        const querySnapshot = await getDocs(collection(database, "expenses"));
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
    };
    fetchExpenses();
  }, []);

  return { expenses, fetchExpensesErrorMessage, isFetchingExpenses };
};
