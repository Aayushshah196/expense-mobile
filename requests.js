import axios from "axios";

const BASE_URL =
  "https://4393-2404-7c00-41-846-7cdb-b1bf-a06a-20ab.ngrok-free.app";
export const getUserList = async (ledger_id = "") => {
  try {
    console.log("Fetching users for ledger:", ledger_id);
    const URL = `${BASE_URL}/users/?ledger_id=${ledger_id}`;
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

export const createExpenseItem = async (expenseData) => {
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

export const createLedger = async (ledgerData) => {
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

export const getLedgerDetails = async (ledgerId) => {
  try {
    const URL = `${BASE_URL}/ledgers/${ledgerId}/`;
    const response = await axios(URL, {
      method: "GET",
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching ledger details:", error.message);
    return { success: false, error: error.message };
  }
};

export const inviteUsersToLedger = async (ledgerId, emailList) => {
  try {
    const URL = `${BASE_URL}/ledgers/${ledgerId}/invite/`;
    const formdata = {
      email_list: emailList,
    };
    const response = await axios.post(URL, formdata, {
      withCredentials: true,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error inviting users to ledger:", error.message);
    return { success: false, error: error.message };
  }
};

export const getInvitations = async (user_id) => {
  try {
    const URL = `${BASE_URL}/ledgers/invitations/${user_id}`;
    const response = await axios(URL, {
      method: "GET",
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error fetching invitations:", error.message);
    return { success: false, error: error.message };
  }
};

export const acceptInvitation = async (invitationId, user_id, ledger_id) => {
  try {
    const URL = `${BASE_URL}/ledgers/invite/accept/`;
    const formdata = {
      user_id: user_id,
      ledger_id: ledger_id,
    };
    const response = await axios.post(URL, formdata, {
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Error accepting invitation:", error.message);
    return { success: false, error: error.message };
  }
};

export const rejectInvitation = async (invitationId, user_id, ledger_id) => {
  try {
    const URL = `${BASE_URL}/ledgers/invite/reject/`;
    const formdata = {
      user_id: user_id,
      ledger_id: ledger_id,
    };
    const response = await axios.post(URL, formdata, {
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Error rejecting invitation:", error.message);
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
    const URL = `${BASE_URL}/report/?start_date=${start_date}&end_date=${end_date}`;
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

export const createNewUser = async (userData) => {
  try {
    const URL = `${BASE_URL}/users/signup/`;
    const response = await axios.post(URL, userData, {
      withCredentials: true,
    });
    const data = response.data;
    return { success: true, data: data };
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { success: false, error: error.message };
  }
};

export const authenticateUser = async (userData) => {
  try {
    const URL = `${BASE_URL}/users/login/`;
    const response = await axios.post(URL, userData, {
      withCredentials: true,
    });
    let success = true;
    const data = response.data.data;
    success = response.data.status;
    return { success: success, data: data };
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { success: false, error: error.message };
  }
};
