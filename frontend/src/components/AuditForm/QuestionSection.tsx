import React from "react";
import { QuestionSectionProps } from "../../interfaces/interfaces";

const QuestionSection: React.FC<QuestionSectionProps> = React.memo(({ title, sectionKey, questions, onQuestionChange, readOnly, startIndex = 1 }) => {
    return (
        <div>
            <h3 className="sectionBanner">{title}</h3>
            {questions.map((q, idx) => (
                <div key={q.idQuestion} className="field">
                    <span className="questionNumber">Q{startIndex + idx}</span>
                    <span className="fieldSubtitle">{q.label}</span>
                    <div className="fieldButtons">
                        <button
                            type="button"
                            className={q.valeur === "J" ? "ratingBtn jActive" : "ratingBtn"}
                            onClick={() => onQuestionChange(sectionKey, idx, "valeur", q.valeur === "J" ? null : "J")}
                            disabled={readOnly}
                        >
                            Bon
                        </button>
                        <button
                            type="button"
                            className={q.valeur === "L" ? "ratingBtn lActive" : "ratingBtn"}
                            onClick={() => onQuestionChange(sectionKey, idx, "valeur", q.valeur === "L" ? null : "L")}
                            disabled={readOnly}
                        >
                            Insuffisant
                        </button>
                        <button
                            type="button"
                            className={q.valeur === "NC" ? "ratingBtn ncActive" : "ratingBtn"}
                            onClick={() => onQuestionChange(sectionKey, idx, "valeur", q.valeur === "NC" ? null : "NC")}
                            disabled={readOnly}
                        >
                            Non concerné
                        </button>
                    </div>
                    {(!readOnly || q.observation) && (
                        <textarea
                            className="observation"
                            placeholder="Observation (optionnel)"
                            readOnly={readOnly}
                            value={q.observation}
                            onChange={(e) => onQuestionChange(sectionKey, idx, "observation", e.target.value)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
});

export default QuestionSection;
