import request from "supertest";
import app from "../../../../app";
import * as loanController from "../../../../api/v1/controllers/loanController"
import { auth } from "../../../../config/firebaseConfig";
import { json } from "node:stream/consumers";

jest.mock("../../../../config/firebaseConfig");

describe("POST /api/v1/loans - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response = await request(app)
            .post("/api/v1/loans")
            .send({ title: "Test loan", content: "Test content" });

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "user",
        });

        // Act
        const response = await request(app)
            .post("/api/v1/loans")
            .set("Authorization", "Bearer valid-token")
            .send({ title: "Test loan", content: "Test content" });

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });

});