import React from "react";

interface FicheField {
    idField: number;
    valeur: boolean | null;
    description: string;
    label: string;
}

type FieldSectionProps = {
    title: string;
    fields: FicheField[];
    onFieldChange: (idx: number, key: string, value: any) => void;
    readOnly: boolean;
    showToggle?: boolean;
    toggleValue?: boolean;
    onToggleChange?: () => void;
};

const FieldSection = React.memo(
    ({ title, fields, onFieldChange, readOnly, showToggle, toggleValue, onToggleChange }: FieldSectionProps) => {
        return (
            <div>
                <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                    <h3 className="fieldTitle">{title}</h3>
                    {showToggle && (
                        <label className="toggleSwitch">
                            <input
                                type="checkbox"
                                checked={toggleValue}
                                onChange={onToggleChange}
                                disabled={readOnly}
                            />
                            <span className="slider"></span>
                        </label>
                    )}
                </div>
                {(!showToggle || toggleValue) &&
                    fields.map((field: any, idx: number) => (
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
    }
);

FieldSection.displayName = "FieldSection";

export default FieldSection;
