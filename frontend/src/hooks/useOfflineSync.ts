import { useEffect, useRef, useState } from "react";
import { createAudit } from "../services/api";
import { getQueue, removeFromQueue } from "../utils/offlineQueue";

export function useOfflineSync() {
    const [pendingCount, setPendingCount] = useState(getQueue().length);
    const [isSyncing, setIsSyncing] = useState(false);
    const syncing = useRef(false);

    async function syncQueue() {
        if (syncing.current) return;
        const queue = getQueue();
        if (!queue.length) return;

        syncing.current = true;
        setIsSyncing(true);
        for (const item of queue) {
            try {
                await createAudit(item.payload);
                removeFromQueue(item.localId);
            } catch {}
        }
        syncing.current = false;
        setIsSyncing(false);
        setPendingCount(getQueue().length);
    }

    useEffect(() => {
        if (navigator.onLine) syncQueue();

        const refreshCount = () => setPendingCount(getQueue().length);
        window.addEventListener("online", syncQueue);
        window.addEventListener("storage", refreshCount);
        window.addEventListener("offlineQueueUpdated", refreshCount);
        return () => {
            window.removeEventListener("online", syncQueue);
            window.removeEventListener("storage", refreshCount);
            window.removeEventListener("offlineQueueUpdated", refreshCount);
        };
    }, []);

    // iOS Safari fallback : retry toutes les 30s tant que des audits sont en attente
    useEffect(() => {
        if (!pendingCount) return;
        const id = setInterval(() => { if (navigator.onLine) syncQueue(); }, 30000);
        return () => clearInterval(id);
    }, [pendingCount]);

    return { pendingCount, isSyncing, syncQueue };
}
