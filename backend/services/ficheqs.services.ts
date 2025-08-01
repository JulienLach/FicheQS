import Ficheqs from "../data/ficheqs";

export async function getAllFichesQS() {
    return await Ficheqs.getAllFichesQS();
}

export async function getFicheQSById(idFiche: number) {
    return await Ficheqs.getFicheQSById(idFiche);
}

export async function createFicheQS(
    status: number,
    visiteDate: Date,
    logement: string,
    idUser: number,
    fields: { idField: number; valeur: boolean | null; description?: string }[]
) {
    return await Ficheqs.createFicheQS(status, visiteDate, logement, idUser, fields);
}
