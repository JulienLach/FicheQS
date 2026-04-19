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

    const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if ("touches" in e) {
            const touch = e.touches[0];
            return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
        }
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };

    const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
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
        e.preventDefault();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current || readOnly) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { x, y } = getPos(e, canvas);
        ctx.lineTo(x, y);
        ctx.stroke();
        setEmpty(false);
        e.preventDefault();
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
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
            />
        </div>
    );
});

export default SignatureCanvas;
