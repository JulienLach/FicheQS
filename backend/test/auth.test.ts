import { describe, it, expect, vi } from "vitest";
import * as authService from "../services/auth.services";

vi.mock("../services/auth.services");

describe("Auth service", () => {
    it("authenticates users correctly", async () => {
        vi.mocked(authService.authenticateUser).mockResolvedValue({
            userId: 123,
            token: "fake-token",
            firstname: "Jean",
            lastname: "Dupont",
            role: 1,
        });

        const result = await authService.authenticateUser("test@email.com", "password");

        expect(result).toEqual({
            userId: 123,
            token: "fake-token",
            firstname: "Jean",
            lastname: "Dupont",
            role: 1,
        });
    });
});
