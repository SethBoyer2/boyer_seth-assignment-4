import { Loan } from "../models/models";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "loans";

export const loans: Loan[] = [];

export const createLoanService = async (loanData: {
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