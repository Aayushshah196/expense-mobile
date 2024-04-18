import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL =
  "https://ba49-2404-7c00-41-8f0c-5ee-da09-e0de-206d.ngrok-free.app";
// "react-native-web": "~0.19.6"
export const get_user_list = async () => {
  try {
    const URL = `${BASE_URL}/users/`;
    const response = await axios(URL, {
      method: "GET",
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return { success: false, error: error.message };
  }
};

export const getExpenseList = async () => {
  try {
    const URL = `${BASE_URL}/expenses/`;
    const response = await axios(URL, {
      method: "GET",
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    return { success: false, error: error.message };
  }
};

export const create_expense_item = async (expenseData) => {
  try {
    const URL = `${BASE_URL}/expenses/`;
    const response = await axios.post(URL, expenseData, {
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error creating expense item:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const URL = `${BASE_URL}/expenses/${expenseId}/`;
    const response = await axios.delete(URL, {
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting expense item:", error.message);
    return { success: false, error: error.message };
  }
};

export const create_ledger = async (ledgerData) => {
  try {
    const URL = `${BASE_URL}/ledgers/`;
    const response = await axios.post(URL, ledgerData, {
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error creating ledger item:", error.message);
    return { success: false, error: error.message };
  }
};

export const getLedgerList = async () => {
  try {
    const URL = `${BASE_URL}/ledgers/`;
    const response = await axios(URL, {
      method: "GET",
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching ledgers:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteLedger = async (ledgerId) => {
  try {
    const URL = `${BASE_URL}/ledgers/${ledgerId}/`;
    const response = await axios.delete(URL, {
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting ledger item:", error.message);
    return { success: false, error: error.message };
  }
};

const formatDate = (dateString) => {
  let parts = dateString.toISOString().split("T");
  return parts[0];
};

const get_date_range = () => {
  let today = new Date();
  let firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return {
    start_date: formatDate(firstDateOfMonth),
    end_date: formatDate(today),
  };
};

export const getExpenseSummary = async (start_date, end_date) => {
  try {
    const { start_date, end_date } = get_date_range();
    console.log("Start Date: ", start_date);
    console.log("End Date: ", end_date);
    const URL = `${BASE_URL}/report/?start_date=${start_date}&end_date=${end_date}`;
    const response = await axios(URL, {
      method: "GET",
      withCredentials: true,
    });
    const data = response.data;
    console.log("Expense data: ", data);
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    return { success: false, error: error.message };
  }
};
