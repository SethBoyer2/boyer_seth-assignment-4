import express from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import loanRouter from "./api/v1/routes/loanRoutes";
import userRouter from "./api/v1/routes/userRoutes";
import adminRouter from "./api/v1/routes/adminRoutes";

const app = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

// API Routes
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1", loanRouter);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;