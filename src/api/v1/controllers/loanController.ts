import { Request, Response, NextFunction } from "express"
import { Loan } from "../models/models"
import { HTTP_STATUS } from "src/constants/httpConstants"
import { successResponse } from "../models/responseModel"
import { createLoanService, deleteLoanService, getAllLoansService, getLoanByIdService, updateLoanService } from "../services/loanService"

export const getAllLoans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loans: Loan[] = await getAllLoansService()
        res.status(HTTP_STATUS.OK).json(
            successResponse(loans, "Items retrieved successfully")
        )
    } catch (error) {
        next(error)
    }
}

// need authorization
export const createLoan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Create new Event object
  try {
    const loan: Loan = req.body
    const createdLoan = await createLoanService(loan)

        const newLoan: Loan = await createLoanService(createdLoan)
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newLoan, "Item created successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const getLoanById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string
        const loan: Loan = await getLoanByIdService(id)
        res.status(HTTP_STATUS.OK).json(
            successResponse(loan, "Item retrieved successfully")
        )
    } catch (error) {
        next(error)
    }
}
// need authorization
export const deleteLoan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string
        await deleteLoanService(id)
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Item deleted successfully")
        )
    } catch (error) {
        next(error)
    }
}
// need authorization
export const updateLoan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string
        const { applicant, amount, status } = req.body

        // Create update data object with only the fields that can be updated
        const updateData = { applicant, amount, status }

        const updatedLoan: Loan = await updateLoanService(id, updateData)
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedLoan, "Item updated successfully")
        )
    } catch (error) {
        next(error)
    }
}