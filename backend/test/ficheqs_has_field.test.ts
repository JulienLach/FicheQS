import { describe, it, expect, vi } from "vitest";
import FicheqsHasField from "../data/ficheqs_has_field";
import pool from "../config/db.config"; // Importe pool pour le mocker

vi.mock("../data/ficheqs_has_field");

describe("get all fields for a ficheqs", () => {
    it("should retrieve all fields for a ficheqs"),
        async () => {
            const mockRows = [
                { id_fiche: 1, id_field: 1, valeur: "daaf_presence", description: "test" },
                { id_fiche: 1, id_field: 2, valeur: "daaf_etat_proprete", description: "test" },
            ];
            vi.mocked(pool.query).mockResolvedValue({ rows: mockRows } as any);

            const result = await FicheqsHasField.getFieldsByFicheId;

            expect(result).toEqual([
                { idFiche: 1, idField: 1, valeur: "test valeur", description: "test desc" },
                { idFiche: 1, idField: 2, valeur: "autre valeur", description: "autre desc" },
            ]);
            expect(pool.query).toHaveBeenCalledWith("SELECT * FROM ficheqs_has_field WHERE id_fiche = $1", [1]);
        };
});
