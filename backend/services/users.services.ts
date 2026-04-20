import Users from "../data/users";

export async function getAllUsers() {
    return await Users.getAllUsers();
}

export async function createUser(email: string, password: string, firstname?: string, lastname?: string): Promise<void> {
    return await Users.createUser(email, password, firstname, lastname);
}

export async function updateUser(idUser: number, email?: string, password?: string, firstname?: string, lastname?: string): Promise<void> {
    return await Users.updateUser(idUser, email, password, firstname, lastname);
}
