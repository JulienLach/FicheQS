import Ficheqs from "../data/ficheqs";
import { FicheqsData, FicheqsHasFieldData } from "../interfaces/types";

export async function getAllFichesQS(): Promise<FicheqsData[]> {
    return await Ficheqs.getAllFichesQS();
}

export async function getFicheQSById(idFiche: number): Promise<{
    fiche: FicheqsData;
    fields: FicheqsHasFieldData[];
}> {
    return await Ficheqs.getFicheQSById(idFiche);
}

export async function createFicheQS(
    status: number,
    visiteDate: string,
    logement: string,
    idUser: number,
    fields: { idField: number; valeur: boolean | null; description?: string }[]
): Promise<FicheqsData> {
    return await Ficheqs.createFicheQS(status, visiteDate, logement, idUser, fields);
}

export async function deleteFicheqs(idFiche: number): Promise<void> {
    return await Ficheqs.deleteFicheqs(idFiche);
}
