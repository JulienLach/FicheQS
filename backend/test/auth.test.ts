import { describe, it, expect, vi } from "vitest";
import * as authService from "../services/auth.services";

// Mock du service d'authentification
vi.mock("../services/auth.services");

describe("Auth service", () => {
    it("authenticates users correctly", async () => {
        // config du mock
        vi.mocked(authService.authenticateUser).mockResolvedValue({
            userId: 123,
            token: "fake-token",
        });

        // Appel de la méthode du service
        const result = await authService.authenticateUser("test@email.com", "password");

        // vérif du résultat
        expect(result).toEqual({
            userId: 123,
            token: "fake-token",
        });
    });
});
