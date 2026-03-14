import { Request, Response, NextFunction } from "express"
import { Loan } from "../models/models"
import { HTTP_STATUS } from "src/constants/httpConstants"
import { successResponse } from "../models/responseModel"
import { createLoanService } from "../services/loanService"

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