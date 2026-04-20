import { describe, it, expect, vi } from "vitest";
import AuditHasQuestion from "../data/audit_has_question";
import pool from "../config/db.config";

vi.mock("../data/audit_has_question");

describe("get all questions for an audit", () => {
    it("should retrieve all questions for an audit"),
        async () => {
            const mockRows = [
                { id_audit: 1, id_question: 1, valeur: "J", observation: null },
                { id_audit: 1, id_question: 2, valeur: "L", observation: "Couloir encombré" },
            ];
            vi.mocked(pool.query).mockResolvedValue({ rows: mockRows } as any);

            const result = await AuditHasQuestion.getQuestionsByAuditId;

            expect(result).toEqual([
                { idAudit: 1, idQuestion: 1, valeur: "J", observation: null },
                { idAudit: 1, idQuestion: 2, valeur: "L", observation: "Couloir encombré" },
            ]);
            expect(pool.query).toHaveBeenCalledWith(
                "SELECT id_audit, id_question, valeur, observation FROM audits_has_question WHERE id_audit = $1",
                [1]
            );
        };
});
