import request from "supertest";
import app from "../../../../app";
import { auth } from "../../../../config/firebaseConfig";

jest.mock("../config/firebaseConfig");

describe("POST /api/v1/posts - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response = await request(app)
            .post("/api/v1/posts")
            .send({ title: "Test Post", content: "Test content" });

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
            .post("/api/v1/posts")
            .set("Authorization", "Bearer valid-token")
            .send({ title: "Test Post", content: "Test content" });

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

    it("should succeed when user has proper role and token", async () => {
        // Arrange
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "admin123",
            role: "admin",
        });

        // Mock your post creation logic here
        // This would typically involve mocking your database or service layer

        // Act
        const response = await request(app)
            .post("/api/v1/posts")
            .set("Authorization", "Bearer valid-admin-token")
            .send({ title: "Test Post", content: "Test content" });

        // Assert
        // Or whatever success status you use
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });
});