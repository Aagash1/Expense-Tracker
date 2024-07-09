import { axiosClient } from "./axiosClient";
import { toast } from 'react-hot-toast';

export const getUserExpenses = async (userId) => {
    try {
        const response = await axiosClient.post('/expenses/allExpenses', { userId });
        const exp = response.data.message.sort((a, b) => new Date(b.date) - new Date(a.date));
        return exp;
    } catch (error) {
        console.error("Error fetching user expenses:", error.message);
        toast.error("Failed to fetch expenses");
    }
};

export const createExpense = async (expInfo) => {
    try {
        const response = await axiosClient.post('/expenses/addExpense', expInfo);
        if (response.data.statusCode !== 200) {
            toast.error(response.data.message);
            return;
        }
        toast.success("Expense added successfully");
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error.message);
        toast.error("Failed to add expense");
    }
};

export const deleteExpense = async (data) => {
    try {
        const { expenseId, userId } = data;
        const response = await axiosClient.post('/expenses/deleteExpense', { expenseId, userId });
        if (response.data.statusCode !== 201) {
            toast.error(response.data.message);
            return;
        }
        toast.success("Expense deleted successfully");
        return response.data;
    } catch (error) {
        console.error("Error deleting expense:", error.message);
        toast.error("Failed to delete expense");
    }
};

