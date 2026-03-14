import express from "express";
import {
    getAllLoans,
    createLoan,
    getLoanById,
    deleteLoan,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();

router.post(
    "/loans",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    createLoan
);

router.get("/loans", authenticate, getAllLoans);

router.get("/posts/:id", authenticate, getLoanById);

// router.put(
//     "/posts/:id",
//     authenticate,
//     isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
//     updatePostHandler
// );

router.delete(
    "/loans/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    deleteLoan
);

export default router;