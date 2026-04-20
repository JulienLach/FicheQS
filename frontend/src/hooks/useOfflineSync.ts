import { useEffect, useState } from "react";
import { createAudit } from "../services/api";
import { getQueue, removeFromQueue } from "../utils/offlineQueue";

export function useOfflineSync() {
    const [pendingCount, setPendingCount] = useState(getQueue().length);

    const syncQueue = async () => {
        const queue = getQueue();
        if (queue.length === 0) return;

        for (const item of queue) {
            try {
                await createAudit(item.payload);
                removeFromQueue(item.localId);
            } catch {
                // Laisse l'audit dans la queue pour la prochaine tentative
            }
        }
        setPendingCount(getQueue().length);
    };

    useEffect(() => {
        if (navigator.onLine) {
            syncQueue();
        }

        const handleOnline = () => syncQueue();
        window.addEventListener("online", handleOnline);
        return () => window.removeEventListener("online", handleOnline);
    }, []);

    // Rafraîchit le compteur quand localStorage change (autre onglet ou même onglet)
    useEffect(() => {
        const handleUpdate = () => setPendingCount(getQueue().length);
        window.addEventListener("storage", handleUpdate);
        window.addEventListener("offlineQueueUpdated", handleUpdate);
        return () => {
            window.removeEventListener("storage", handleUpdate);
            window.removeEventListener("offlineQueueUpdated", handleUpdate);
        };
    }, []);

    return { pendingCount };
}
