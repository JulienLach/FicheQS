import Ficheqs from "../data/ficheqs";

export async function getAllFichesQS() {
    return await Ficheqs.getAllFichesQS();
}

export async function getFicheQSById(idFiche: number) {
    return await Ficheqs.getFicheQSById(idFiche);
}
