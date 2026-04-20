import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";

export interface SignatureCanvasHandle {
    toDataURL: () => string;
    isEmpty: () => boolean;
    clear: () => void;
    getTimestamp: () => string | null;
}

type Props = {
    readOnly?: boolean;
    initialDataURL?: string;
};

const SignatureCanvas = forwardRef<SignatureCanvasHandle, Props>(({ readOnly = false, initialDataURL }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const [empty, setEmpty] = useState(true);
    const [signatureTimestamp, setSignatureTimestamp] = useState<string | null>(null);

    // Use refs for callbacks so touch listeners don't need to be re-registered on state changes
    const emptyRef = useRef(empty);
    const signatureTimestampRef = useRef(signatureTimestamp);
    emptyRef.current = empty;
    signatureTimestampRef.current = signatureTimestamp;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.strokeStyle = "#1f2937";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        if (initialDataURL) {
            const img = new Image();
            img.onload = () => ctx.drawImage(img, 0, 0);
            img.src = initialDataURL;
            setEmpty(false);
        }
    }, [initialDataURL]);

    // Register touch listeners as non-passive so preventDefault() works on iOS Safari
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const getPos = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const touch = e.touches[0];
            return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
        };

        const onTouchStart = (e: TouchEvent) => {
            if (readOnly) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            e.preventDefault();
            if (emptyRef.current && !signatureTimestampRef.current) setSignatureTimestamp(new Date().toISOString());
            isDrawing.current = true;
            const { x, y } = getPos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!isDrawing.current || readOnly) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            e.preventDefault();
            const { x, y } = getPos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
            setEmpty(false);
        };

        const onTouchEnd = () => {
            isDrawing.current = false;
        };

        canvas.addEventListener("touchstart", onTouchStart, { passive: false });
        canvas.addEventListener("touchmove", onTouchMove, { passive: false });
        canvas.addEventListener("touchend", onTouchEnd);

        return () => {
            canvas.removeEventListener("touchstart", onTouchStart);
            canvas.removeEventListener("touchmove", onTouchMove);
            canvas.removeEventListener("touchend", onTouchEnd);
        };
    }, [readOnly]);

    useImperativeHandle(ref, () => ({
        toDataURL: () => canvasRef.current?.toDataURL("image/png") ?? "",
        isEmpty: () => empty,
        clear: () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            setEmpty(true);
            setSignatureTimestamp(null);
        },
        getTimestamp: () => signatureTimestamp,
    }));

    const getPos = (e: React.MouseEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };

    const startDraw = (e: React.MouseEvent) => {
        if (readOnly) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        if (empty && !signatureTimestamp) setSignatureTimestamp(new Date().toISOString());
        isDrawing.current = true;
        const { x, y } = getPos(e, canvas);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing.current || readOnly) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { x, y } = getPos(e, canvas);
        ctx.lineTo(x, y);
        ctx.stroke();
        setEmpty(false);
    };

    const stopDraw = () => {
        isDrawing.current = false;
    };

    return (
        <div className="signatureWrapper">
            <canvas
                ref={canvasRef}
                width={500}
                height={120}
                className={`signatureCanvas${readOnly ? " readOnly" : ""}`}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
            />
        </div>
    );
});

export default SignatureCanvas;
