import { Request, Response, NextFunction } from "express";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Middleware fonction récursive qui sanitize les champs texte envoyés par l'API
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
    const sanitizeObject = (obj: any): any => {
        if (!obj) return obj;

        // sanitize strings
        if (typeof obj === "string") {
            return DOMPurify.sanitize(obj);
        }

        // sanitize array
        if (Array.isArray(obj)) {
            return obj.map((item) => sanitizeObject(item));
        }

        // sanitize objects
        if (typeof obj === "object") {
            const result: any = {};
            for (const key in obj) {
                result[key] = sanitizeObject(obj[key]);
            }
            return result;
        }

        return obj;
    };

    // Sanitize tout le body en entré de manière récursive
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }

    next();
}
