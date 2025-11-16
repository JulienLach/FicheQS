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

    describe("Create FicheQS", () => {
        it("should create a new FicheQS", async () => {
            const ficheData = {
                status: 1,
                visiteDate: "2025-11-16",
                logement: "330976.123.54.032",
                idUser: 1,
            };
            const fields: { idField: number; valeur: boolean | null; description?: string }[] = [];
            const createdFiche = { idFiche: 2, ...ficheData };
            vi.mocked(Ficheqs.createFicheQS).mockResolvedValue(createdFiche);

            const result = await ficheqsService.createFicheQS(
                ficheData.status,
                ficheData.visiteDate,
                ficheData.logement,
                ficheData.idUser,
                fields
            );
            expect(result).toEqual(createdFiche);
            expect(Ficheqs.createFicheQS).toHaveBeenCalledWith(
                ficheData.status,
                ficheData.visiteDate,
                ficheData.logement,
                ficheData.idUser,
                fields
            );
        });
    });
});
