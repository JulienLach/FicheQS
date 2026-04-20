import { PendingAudit } from "../interfaces/interfaces";

const QUEUE_KEY = "pending_audits";

export function queueAudit(payload: any): string {
    const localId = crypto.randomUUID();
    const queue = getQueue();
    queue.push({ localId, payload, savedAt: new Date().toISOString() });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new CustomEvent("offlineQueueUpdated"));
    return localId;
}

export function getQueue(): PendingAudit[] {
    try {
        return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
    } catch {
        return [];
    }
}

export function removeFromQueue(localId: string): void {
    const updated = getQueue().filter((a) => a.localId !== localId);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
}
