import { describe, it, expect, vi } from "vitest";
import * as auditService from "../services/audit.services";
import Audit from "../data/audit";

vi.mock("../data/audit");

describe("Audit Service", () => {
    describe("Get Audit by id", () => {
        it("should retrieve Audit by id", async () => {
            const mockData = {
                audit: {
                    idAudit: 1,
                    status: 2,
                    auditDate: "2025-08-20",
                    site: "Site A",
                    auditeur: "Jean Dupont",
                    natureAudit: "Audit terrain",
                    audites: "Martin Pierre",
                    observationGenerale: null,
                    signature: null,
                    signatureTimestamp: null,
                    idUser: 1,
                },
                questions: [],
                actions: [],
            };
            vi.mocked(Audit.getAuditById).mockResolvedValue(mockData);

            const result = await auditService.getAuditById(1);
            expect(result).toEqual(mockData);
            expect(Audit.getAuditById).toHaveBeenCalledWith(1);
        });
    });

    describe("Delete Audit", () => {
        it("should delete Audit", async () => {
            vi.mocked(Audit.deleteAudit).mockResolvedValue(undefined);

            await expect(auditService.deleteAudit(1)).resolves.toBeUndefined();
            expect(Audit.deleteAudit).toHaveBeenCalledWith(1);
        });
    });

    describe("Create Audit", () => {
        it("should create a new Audit", async () => {
            const auditData = {
                status: 2,
                auditDate: "2025-11-16",
                site: "Site B",
                auditeur: "Marie Martin",
                natureAudit: "Audit sécurité",
                audites: "Pierre Dubois",
                observationGenerale: null,
                signature: null,
                signatureTimestamp: null,
                idUser: 1,
            };
            const questions: { idQuestion: number; valeur: "J" | "L" | "NC" | null; observation?: string }[] = [];
            const actions: { nature: string; delai: string; responsable: string }[] = [];
            const createdAudit = { idAudit: 2, ...auditData };
            vi.mocked(Audit.createAudit).mockResolvedValue(createdAudit);

            const result = await auditService.createAudit(
                auditData.status,
                auditData.auditDate,
                auditData.site,
                auditData.auditeur,
                auditData.natureAudit,
                auditData.audites,
                auditData.observationGenerale,
                auditData.signature,
                auditData.signatureTimestamp,
                auditData.idUser,
                questions,
                actions
            );
            expect(result).toEqual(createdAudit);
            expect(Audit.createAudit).toHaveBeenCalledWith(
                auditData.status,
                auditData.auditDate,
                auditData.site,
                auditData.auditeur,
                auditData.natureAudit,
                auditData.audites,
                auditData.observationGenerale,
                auditData.signature,
                auditData.signatureTimestamp,
                auditData.idUser,
                questions,
                actions
            );
        });
    });
});
