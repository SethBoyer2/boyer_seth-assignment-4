import { Loan } from "../models/models";

export const createLoanService = async (loanData: {
    id: String,
    applicant: String,
    amount: Number,
    status: String
}): Promise<Loan> => {
    try {
        const now = new Date();
        const newLoanData = {
            ...loanData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Loan>(COLLECTION, newLoanData);
        return { id, ...newLoanData } as Loan;
    } catch (error) {
        throw error;
    }
};