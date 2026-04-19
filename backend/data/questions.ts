import pool from "../config/db.config";
import { QuestionData } from "../interfaces/interfaces";

export default class Questions {
    constructor(public idQuestion: number, public name: string, public section: string) {}

    public static async getAllQuestions(): Promise<QuestionData[]> {
        const result = await pool.query("SELECT id_question, name, section FROM questions");
        return result.rows.map(
            (row: any): QuestionData => ({
                idQuestion: row.id_question,
                name: row.name,
                section: row.section,
            })
        );
    }
}
