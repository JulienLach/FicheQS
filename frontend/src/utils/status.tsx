import React from "react";

export function formatStatus(status: number) {
    if (status === 2) {
        return <i className="fas fa-circle-check" style={{ color: "#00C472" }}></i>;
    }
    return null;
}

export function formatStatusTag(status: number) {
    if (status === 2) {
        return (
            <div className="statusField">
                <p>Status :</p>
                <div className="statusTag">Validé</div>
            </div>
        );
    }
    return null;
}
