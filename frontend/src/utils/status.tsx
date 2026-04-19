export function formatStatus(status: number) {
    if (status === 2) {
        return <i className="fas fa-check" style={{ color: "#2665ae" }}></i>;
    }
    return null;
}

export function formatStatusTag(status: number) {
    if (status === 2) {
        return (
            <div className="statusField">
                <p>Statut :</p>
                <div className="statusTag">Validé</div>
            </div>
        );
    }
    return null;
}
