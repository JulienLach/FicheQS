import { describe, it, expect, vi } from "vitest";
import * as ficheqsService from "../services/ficheqs.services";
import Ficheqs from "../data/ficheqs";

vi.mock("../data/ficheqs");

describe("FicheQS Service", () => {
    describe("Get FicheQS by id", () => {
        it("should retrieve FicheQS by id", async () => {
            const mockData = {
                fiche: {
                    idFiche: 1,
                    status: 1,
                    visiteDate: "2023-01-01",
                    logement: "Test Logement",
                    idUser: 1,
                },
                fields: [],
            };
            vi.mocked(Ficheqs.getFicheQSById).mockResolvedValue(mockData);

            const result = await ficheqsService.getFicheQSById(1);
            expect(result).toEqual(mockData);
            expect(Ficheqs.getFicheQSById).toHaveBeenCalledWith(1);
        });
    });

    describe("Delete FicheQS", () => {
        it("should delete FicheQS", async () => {
            vi.mocked(Ficheqs.deleteFicheqs).mockResolvedValue(undefined);

            await expect(ficheqsService.deleteFicheqs(1)).resolves.toBeUndefined();
            expect(Ficheqs.deleteFicheqs).toHaveBeenCalledWith(1);
        });
    });
});
