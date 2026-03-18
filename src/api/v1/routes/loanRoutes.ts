import express from "express";
import {
    getAllLoans,
    createLoan,
    getLoanById,
    deleteLoan,
    updateLoan,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const loanRouter: express.Router = express.Router();

loanRouter.post(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    createLoan
);

loanRouter.get("/loans", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), getAllLoans);

loanRouter.get("/loans/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), getLoanById);

loanRouter.put(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    updateLoan
);

loanRouter.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    deleteLoan
);

export default loanRouter;