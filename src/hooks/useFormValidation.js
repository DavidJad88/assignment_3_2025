import { useState } from "react";

export const useFormValidation = () => {
  const [formErrors, setformErrors] = useState({});

  const validate = (values) => {
    let newFormErrors = {};

    if (!values.description.trim()) {
      newFormErrors.description = "Description is required";
    }
    if (!values.amount) {
      newFormErrors.amount = "Amount is requred";
    }
    if (!values.category) {
      newFormErrors.category = "Category is required";
    }
    if (!values.date) {
      newFormErrors.date = "Date is required";
    }

    setformErrors(newFormErrors);
    return Object.keys(newFormErrors).length === 0;
  };
  return { validate, formErrors };
};
