import React from "react";
import { FieldSectionProps } from "../../interfaces/interfaces";

const FieldSection: React.FC<FieldSectionProps> = React.memo(({ title, fields, onFieldChange, readOnly }) => {
    return (
        <div>
            <h3 className="fieldTitle">{title}</h3>
            {fields.map((field, idx) => (
                <div key={field.idField} className="field">
                    <span className="fieldSubtitle">{field.label} :</span>
                    <div className="fieldButtons">
                        <button
                            type="button"
                            className={field.valeur === true ? "switch active" : "switch"}
                            onClick={() => onFieldChange(idx, "valeur", field.valeur === true ? null : true)}
                            disabled={readOnly}
                        >
                            <i className="fas fa-check"></i>
                            Ok
                        </button>
                        <button
                            type="button"
                            className={field.valeur === false ? "switch descActive" : "switch"}
                            onClick={() => onFieldChange(idx, "valeur", field.valeur === false ? null : false)}
                            disabled={readOnly}
                        >
                            <i className="far fa-calendar"></i>
                            Pas opérationnel
                        </button>
                    </div>
                    {field.valeur === false && (
                        <textarea
                            className="description"
                            placeholder="Description"
                            readOnly={readOnly}
                            value={field.description}
                            onChange={(e) => onFieldChange(idx, "description", e.target.value)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
});

export default FieldSection;
