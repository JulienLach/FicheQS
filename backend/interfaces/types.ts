import Ficheqs from "../data/ficheqs";
import Users from "../data/users";
import Fields from "../data/fields";

export interface UserData {
    idUser: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface FicheqsData {
    idFiche: number;
    status: string;
    visiteDate: string;
    logement: string;
    idUser: number;
}

export interface FieldData {
    idField: number;
    name: string;
}

export interface FicheqsHasFieldData {
    idFiche: number;
    idField: number;
    valeur: boolean | null;
    description: string | null;
}
