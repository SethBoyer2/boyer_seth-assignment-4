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

export const getAllLoansService = async (): Promise<Loan[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const loans: Loan[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                applicant: data.applicant,
                amount: data.amount,
                status: data.status,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Loan;
        });
        return loans;
    } catch (error) {
        throw error;
    }
};

export const getLoanByIdService = async (id: string): Promise<Loan> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
          throw new Error(`No Valid Data.`)
        }

        const loan: Loan = {
            id: doc.id,
            applicant: data.applicant,
            amount: data.amount,
            status: data.status,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Loan;

        return loan;
    } catch (error) {
        throw error;
    }
};

export const deleteLoanService = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};

export const updateLoanService = async (
    id: string,
    loanData: Partial<Pick<Loan, "applicant" | "amount" | "status">>
): Promise<Loan> => {
    try {
        const updateData = {
            ...loanData,
            updatedAt: new Date(),
        };

        await updateDocument<Loan>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedLoan = await getLoanByIdService(id);
        return updatedLoan;
    } catch (error) {
        throw error;
    }
};